<script setup>
const page = ref(1);
const itemsPerPage = 9;
const showModal = ref(false);
const selectedTutor = ref(null);

const filters = ref({
  name: '',
  location: '',
  subject: '',
  years: ''
});

const sortConfig = ref({
  key: 'id',
  direction: 'asc'
});

// Example in a page or component
const token = useCookie('token');
 

console.log('Token value:', token.value)
console.log('Token exists:', !!token.value)// SSR-safe
const { data: tutorsList, pending, error } = useAsyncData('tutors', () =>
  $fetch('http://localhost:8000/tutors/', {
    headers: {
      Authorization: token.value ? `Token ${token.value}` : ''
    }
  })
)

const filteredTutors = computed(() => {
  if (!Array.isArray(tutorsList.value)) return [];
  let result = tutorsList.value.filter(tutor => {
    return (
      (filters.value.name === '' || tutor.name.toLowerCase().includes(filters.value.name.toLowerCase())) &&
      (filters.value.location === '' || tutor.location.toLowerCase().includes(filters.value.location.toLowerCase())) &&
      (filters.value.years === '' || tutor.years_of_experience == filters.value.years) &&
      (filters.value.subject === '' || tutor.subject.toLowerCase().includes(filters.value.subject.toLowerCase()))
    );
  });

  result = result.sort((a, b) => {
    const valueA = a[sortConfig.value.key];
    const valueB = b[sortConfig.value.key];

    if (typeof valueA === 'string') {
      if (sortConfig.value.direction === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    } else {
      if (sortConfig.value.direction === 'asc') {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    }
  });

  return result;
});

const totalPages = computed(() =>
  Math.ceil(filteredTutors.value.length / itemsPerPage)
);

const paginatedTutors = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  return filteredTutors.value.slice(start, start + itemsPerPage);
});

const handleFilterChange = () => {
  page.value = 1;
};

const toggleSort = (key) => {
  if (sortConfig.value.key === key) {
    sortConfig.value.direction = sortConfig.value.direction === 'asc' ? 'desc' : 'asc';
  } else {
    sortConfig.value.key = key;
    sortConfig.value.direction = 'asc';
  }
  page.value = 1;
};

const nextPage = () => {
  if (page.value < totalPages.value) page.value++;
};

const prevPage = () => {
  if (page.value > 1) page.value--;
};

const openModal = (tutor) => {
  selectedTutor.value = tutor;
  showModal.value = true;
};

const resetFilters = () => {
  filters.value = {
    name: '',
    location: '',
    subject: '',
    years: ''
  };
  sortConfig.value = {
    key: 'id',
    direction: 'asc'
  };
  page.value = 1;
};
</script>

<template>
  <navbar />
  <div class="container">
    <h1 class="title">Find Your Perfect Tutor</h1>

    <section class="filter-section">
      <h2 class="section-title">Filter Tutors</h2>
      <div v-if="pending">Loading...</div>
      <div v-if="error">Error loading tutors</div>

      <div class="filter-grid">
        <div>
          <label>Name</label>
          <input v-model="filters.name" @input="handleFilterChange" type="text" placeholder="Search by name" />
        </div>

        <div>
          <label>Location</label>
          <input v-model="filters.location" @input="handleFilterChange" type="text" placeholder="Search by location" />
        </div>

        <div>
          <label>Subject</label>
          <input v-model="filters.subject" @input="handleFilterChange" type="text" placeholder="Search by subject" />
        </div>

        <div>
          <label>Years of Experience</label>
          <input v-model="filters.years" @input="handleFilterChange" type="number" placeholder="Min experience" />
        </div>
      </div>

      <div class="filter-footer">
        <span>{{ filteredTutors.length }} tutors found</span>
        <button @click="resetFilters" class="btn-reset">Reset Filters</button>
      </div>
    </section>

    <div class="sort-controls">
      <div class="sort-buttons">
        <button @click="toggleSort('id')" :class="{ active: sortConfig.key === 'id' }">
          ID {{ sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '' }}
        </button>
        <button @click="toggleSort('name')" :class="{ active: sortConfig.key === 'name' }">
          Name {{ sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '' }}
        </button>
        <button @click="toggleSort('years_of_experience')"
          :class="{ active: sortConfig.key === 'years_of_experience' }">
          Experience {{ sortConfig.key === 'years_of_experience' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '' }}
        </button>
      </div>
    </div>

    <div v-if="pending" class="loading-spinner"></div>

    <div v-else-if="error" class="error-message">
      <strong>Error!</strong> Failed to load tutors. Please try again later.
    </div>

    <div v-else class="tutors-grid">
      <div v-for="tutor in paginatedTutors" :key="tutor.id" class="tutor-card" @click="openModal(tutor)">
        <div class="card-content">
          <h3>{{ tutor.name }}</h3>
          <p class="location">{{ tutor.location }}</p>
          <p>Subject: <span>{{ tutor.subject }}</span></p>
          <p>Experience: <span>{{ tutor.years_of_experience }} years</span></p>
          <div class="card-footer">
            <button @click.stop="openModal(tutor)" class="btn-view-details">View Details</button>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
  <button @click="page = 1" :disabled="page === 1" class="btn-paginate">First</button>
  <button @click="prevPage" :disabled="page === 1" class="btn-paginate">Previous</button>
  <span>{{ page }} / {{ totalPages }}</span>
  <button @click="nextPage" :disabled="page === totalPages" class="btn-paginate">Next</button>
  <button @click="page = totalPages" :disabled="page === totalPages" class="btn-paginate">Last</button>
</div>


    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <button @click="showModal = false" class="modal-close">&times;</button>
        <h2>{{ selectedTutor.name }}</h2>
        <p><strong>Location:</strong> {{ selectedTutor.location }}</p>
        <p><strong>Subject:</strong> {{ selectedTutor.subject }}</p>
        <p><strong>Experience:</strong> {{ selectedTutor.years_of_experience }} years</p>
        <p><strong>Education Level:</strong> {{ selectedTutor.education_level }}</p>
        <p><strong>Skills:</strong> {{ selectedTutor.skills.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container */
.container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
}

/* Titles */
.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

/* Filter Section */
.filter-section {
  background-color: #f3f4f6;
  /* light gray */
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}

.filter-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .filter-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.filter-grid label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #374151;
}

.filter-grid input {
  width: 100%;
  padding: 0.375rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  outline-offset: 2px;
  outline-color: #6366f1;
}

.filter-footer {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #4b5563;
  font-size: 0.875rem;
}

.btn-reset {
  background-color: #e5e7eb;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: 600;
  border-radius: 0.375rem;
  cursor: pointer;
  color: #1f2937;
  transition: background-color 0.2s ease-in-out;
}

.btn-reset:hover {
  background-color: #d1d5db;
}

/* Sorting Controls */
.sort-controls {
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-end;
}

.sort-buttons {
  display: inline-flex;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
  background-color: white;
  border: 1px solid #d1d5db;
}

.sort-buttons button {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  background: white;
  cursor: pointer;
  user-select: none;
  border-right: 1px solid #d1d5db;
  transition: background-color 0.2s ease-in-out;
}

.sort-buttons button:last-child {
  border-right: none;
}

.sort-buttons button:hover {
  background-color: #f3f4f6;
}

.sort-buttons button.active {
  background-color: #c7d2fe;
  /* indigo-200 */
  color: #4338ca;
  /* indigo-700 */
}

/* Loading Spinner */
.loading-spinner {
  margin: 3rem auto;
  width: 3rem;
  height: 3rem;
  border: 4px solid #cbd5e1;
  border-top: 4px solid #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error message */
.error-message {
  padding: 1rem;
  background-color: #fee2e2;
  /* red-100 */
  color: #b91c1c;
  /* red-700 */
  border-radius: 0.375rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
}

/* Tutors Grid */
.tutors-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .tutors-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .tutors-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.tutor-card {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: white;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}

.tutor-card:hover {
  box-shadow: 0 10px 15px rgb(0 0 0 / 0.1);
}

.card-content h3 {
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
  color: #1f2937;
}

.location {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.card-content p {
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 0.25rem;
}

.card-content span {
  font-weight: 600;
}

/* Card Footer */
.card-footer {
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
}

.btn-view-details {
  background-color: #4338ca;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.btn-view-details:hover {
  background-color: #3730a3;
}

/* Pagination */
.pagination {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  font-weight: 600;
  color: #374151;
}

.btn-paginate {
  background-color: #d1d5db;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
  color: #1f2937;
  transition: background-color 0.2s ease-in-out;
}

.btn-paginate:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-paginate:hover:not(:disabled) {
  background-color: #9ca3af;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  max-width: 480px;
  width: 90%;
  padding: 1.5rem;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #4b5563;
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s ease-in-out;
}

.modal-close:hover {
  color: #111827;
}

.modal-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
}

.modal-content p {
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
}

.modal-content strong {
  font-weight: 600;
  color: #374151;
}
</style>
