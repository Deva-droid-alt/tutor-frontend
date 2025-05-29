<template>
  <div>
    <Navbar />
    <PopUp /> <!-- This will show the welcome popup if conditions are met -->
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">
          Welcome, {{ user }} </h1>
         <h2 class="hero-title">Find the Perfect Tutor for You</h2>
        
        <p class="hero-subtitle">
          Connecting tutors and students from around the world
        </p>
        <div class="hero-buttons">
          <NuxtLink to="/tutorform" class="browse-button">
            Become a tutor
          </NuxtLink>
          <NuxtLink to="/tutors" class="browse-button">
            Search subjects and filteredTutors
          </NuxtLink>
          
          <!-- <NuxtLink to="/tutors" class="browse-button">
            Search subjects
          </NuxtLink> -->
          <div>
    <button @click="showLearnmore = true" class="browse-button">
      Learn More
    </button>

    <Learnmore :is-visible="showLearnmore" @close="showLearnmore = false" />
  </div>
        </div>
      </div>
    </section>

    <!-- Animated Image Group -->
    <section class="thq-animated-group-horizontal">
      <div class="image-container">
        <img
          src="https://clueylearning.com.au/wp-content/uploads/2019/10/What-is-tutoring-Different-types-of-tutoring-explained.jpg"
          alt="Tutor 1" />
        <img
          src="https://media.istockphoto.com/id/187244393/photo/we-will-get-to-the-right-answer-eventually.jpg?s=612x612&w=0&k=20&c=sv85YclfSvJwBzxHipFN5YSNIDSU6YXe8skqZb6QVjw="
          alt="Tutor 2" />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROcbKnnG4CPjMXoMgclwro8nnLzgzkwMxN2zgnYHuRjCd7lydgF_Zf0egeEqm4WOsj2HA&usqp=CAU"
          alt="Tutor 3" />
        <img
          src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202005/1onorxy-ww0-peter-hershey.jpeg?size=690:388"
          alt="Tutor 4" />
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <div class="how-it-container">
        <h2 class="how-it-title">How It Works</h2>
        <div class="how-it-grid">
          <div class="how-it-card">
            <div class="how-it-icon purple">🔍</div>
            <h3 class="how-it-heading">Search Tutors</h3>
            <p class="how-it-text">Find tutors by subject, location, or grade level.</p>
          </div>
          <div class="how-it-card">
            <div class="how-it-icon pink">✅</div>
            <h3 class="how-it-heading">Verified Profiles</h3>
            <p class="how-it-text">Look for the verified badge before you book a tutor for better classes.</p>
          </div>
          <div class="how-it-card">
            <div class="how-it-icon violet">💬</div>
            <h3 class="how-it-heading">Connect & Learn</h3>
            <p class="how-it-text">Message tutors and start learning right away.</p>
          </div>
        </div>
      </div>
    </section>

    <br>
    <br>

    <MapView />

    <div class="map-section">

      <div class="expanding-message">
        "More than 20 Countries, and Still Growing!"
      </div>
      <div class="expanding-message">
        "Connecting Knowledge from Every Corner of the World."
      </div>

      <h1 class="headline">Empowering Knowledge, Everywhere</h1>
      <p class="subtext">Join a Global Community of Learners</p>

    </div>

    <section id="about" class="about-us">
      <div class="about-container">
        <div class="about-row">
          <div class="about-background">
            <img src="https://i.gifer.com/IPNp.gif" alt="Background Animation" />
          </div>
          <div class="about-text">
            <h2>About TutorLink</h2>
            <p>
              At FindMyTutor, we are dedicated to connecting students with the right tutors to enhance their learning
              experience. Our mission is to provide personalized education solutions that cater to individual needs.
            </p>
          </div>
        </div>

        <div class="features">
          <div class="feature-card">
            <h3>Personalized Tutor Matching</h3>
            <p>Our platform uses advanced algorithms to match you with the perfect tutor based on your needs and
              preferences.</p>
          </div>

          <div class="feature-card">
            <h3>Flexible Scheduling Options</h3>
            <p>Easily schedule tutoring sessions at your convenience, whether it's early morning or late at night.</p>
          </div>

          <div class="feature-card">
            <h3>Interactive Learning Tools</h3>
            <p>Engage in interactive lessons with our tutors using cutting-edge tools to enhance your learning
              experience.</p>
          </div>
        </div>

        <div class="cta">
          <h2>Find Your Perfect Tutor Today</h2>
          <p>Get personalized recommendations and connect with experienced tutors in your area.</p>
          <NuxtLink to="/tutors" class="cta-button">
            <button>Start Your Search</button>
          </NuxtLink>

        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="faq">
      <div class="faq-container">
        <h2>FAQs</h2>

        <p>
          Explore our answers to the most common questions about tutoring and how FindMyTutor can help you.
        </p>
        <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
          <div class="faq-question" @click="toggleFAQ(index)">
            <span>{{ faq.question }}</span>
            <span :class="{ 'rotate-arrow': faq.open }">▶</span>
          </div>
          <div v-show="faq.open" class="faq-answer">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </section>
  </div>
  <div>
    <!-- Other content -->
    <Footer />
  </div>
</template>

<script setup>

const router = useRouter();
const user = ref('')

// Fetch the user from local storage or API
onMounted(() => {
  const token = localStorage.getItem('token')

  if (token) {
    // Replace this with the actual API call to get user details if needed
    user.value = 'John Doe'  // Replace with actual user data
  } else {
    // Redirect to login if the user is not authenticated
    alert('You are not logged in. Redirecting to login.')
    window.location.href = '/login'
  }
})

async function logout() {
  const { error } = await useSupabaseClient().auth.signOut();
  if (error) {
    console.error("Error logging out:", error);
  } else {
    router.push("/login");
  }
}
const showLearnmore = ref(false);

function toggleLearnmore() {
  showLearnmore.value = !showLearnmore.value;
}

console.log(user.value);

const faqs = reactive([
  {
    question: "How do I find a tutor?",
    answer: "Simply use our search feature to filter tutors by subject, availability, and location.",
    open: false,
  },
  {
    question: "What subjects are available?",
    answer: "We offer tutoring in a wide range of subjects, including math, science, languages, and more.",
    open: false,
  },
  {
    question: "Is there a trial session?",
    answer: "Yes, many tutors offer a trial session to help you determine if they are the right fit.",
    open: false,
  },
])

function toggleFAQ(index) {
  faqs[index].open = !faqs[index].open
}
</script>

<style scoped>


#map {
  width: 80%;
  height: 500px;
  /* Adjust as needed */
  position: center;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 10px;
}

.map-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


  color: #0b0b0c;
  padding: 2rem;
  text-align: center;
}

.headline {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 15px rgba(61, 44, 123, 0.7);
  animation: fadeInUp 1s ease-in-out both;
  margin-top: 40px;
}

.subtext {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 2rem;
  color: #1e1414;
  animation: fadeInUp 1.5s ease-in-out both;
}

.expanding-message {
  font-size: 1.25rem;
  font-weight: 600;
  color: #110b0b;
  margin-top: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  border: 2px solid #6f6a6a;
  animation: fadeInUp 2s ease-in-out both;
}


/* About Us Styles */
.about-row {
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.about-background img {
  width: 300px;
  height: auto;
  border-radius: 12px;
}

.about-text {
  flex: 1;
  max-width: 800px;
  text-align: left;
  padding: 20px;
  background-color: #f3f4f6;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s, box-shadow 0.3s;

}


.features {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 40px;
}

.feature-card {
  flex: 1 1 calc(33.33% - 30px);
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.feature-card h3 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 700;
}

.feature-card p {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}

.cta {
  text-align: center;
  background-color: #747295;
  color: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
}

.cta h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.cta p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  line-height: 1.6;
}

.cta button {
  background-color: #fff;
  color: #0d0808;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.cta button:hover {
  background-color: #0f0e0e;
  color: #fff;
}


/* FAQ Section */
.faq {
  padding: 4rem 1rem;
  background-color: #f9fafb;
  text-align: center;
}

.faq-container {
  max-width: 72rem;
  margin: 0 auto;
  text-align: left;
}

.faq h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #111827;
  text-align: center;
}

.faq p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  color: #4b5563;
  text-align: center;
}

.faq-item {
  margin-bottom: 1.5rem;
  background: #ffffff;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: background-color 0.3s;
}

.faq-item:hover {
  background-color: #f3f4f6;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1.125rem;
}

.faq-answer {
  margin-top: 1rem;
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

.rotate-arrow {
  transform: rotate(90deg);
  transition: transform 0.3s;
}

html {
  scroll-behavior: smooth;
}

.about-us,
.faq {
  padding: 4rem 1rem;
  background-color: #f9fafb;
  text-align: center;
  margin-bottom: 2rem;
}

.about-container,
.faq-container {
  max-width: 72rem;
  margin: 0 auto;
}

.about-us h2,
.faq h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #111827;
}

.about-us p {
  font-size: 1.125rem;
  color: #4b5563;
}

.faq ul {
  list-style-type: none;
  padding: 0;
  font-size: 1.125rem;
  color: #4b5563;
}

.faq li {
  margin-bottom: 1rem;
}

.faq li::before {
  content: "• ";
  color: #6b21a8;
  font-weight: bold;
}


/* Hero Section Styles */
.hero-section {
  position: relative;
  text-align: center;
  padding: 7rem 0;
  overflow: hidden;
  background: linear-gradient(140deg, #001f3f, #00509e);
  animation: backgroundSlide 10s infinite alternate ease-in-out;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 15, 30, 0.7);
  z-index: 0;
  filter: blur(20px);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 74rem;
  margin: 0 auto;
  padding: 0 1rem;
  color: #ffffff;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 8px 24px rgba(0, 0, 0, 0.8);
  animation: fadeInDown 1.5s ease-in-out;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.7);
  animation: fadeInUp 1.5s 0.5s ease-in-out;
}

.hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 4rem;
  }

  .hero-subtitle {
    font-size: 1.5rem;
  }

  .hero-buttons {
    flex-direction: row;
  }
}

.browse-button {
  background-color: #ffffff;
  color: #00509e;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transition: background-color 0.6s, transform 0.3s, box-shadow 0.6s;
}

.browse-button:hover {
  background-color: #f5a623;
  color: #001f3f;
  transform: scale(1.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

/* Keyframe Animations */
@keyframes backgroundSlide {
  0% {
    background: linear-gradient(140deg, #001f3f, #00509e);
  }

  100% {
    background: linear-gradient(140deg, #00509e, #001f3f);
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}


/* How It Works Section */
.how-it-works {
  padding: 5rem 0;
  background-color: #f3f4f6;
}

.how-it-container {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

.how-it-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3.5rem;
  color: #111827;
}

@media (min-width: 768px) {
  .how-it-title {
    font-size: 2.5rem;
  }
}

.how-it-grid {
  display: grid;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .how-it-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.how-it-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  transform: scale(1);
}

.how-it-card:hover {
  background-color: #af8cd4;
  /* Light violet */
  transform: scale(1.15);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.how-it-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.25rem;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
}

.purple {
  background-color: #f3e8ff;
  color: #6b21a8;
}

.pink {
  background-color: #fce7f3;
  color: #db2777;
}

.violet {
  background-color: #ede9fe;
  color: #7c3aed;
}

.how-it-heading {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #000;
}

.how-it-text {
  color: #4b5563;
}

/* Animated Image Group */
.thq-animated-group-horizontal {
  display: flex;
  gap: 1rem;
  padding: 2rem 0;
  overflow: hidden;
}

.image-container {
  display: flex;
  gap: 1rem;
  animation: scroll 4s linear infinite;
}

.image-container img {
  width: 500px;
  height: 300px;
  object-fit: cover;
  border-radius: 1rem;
  transition: transform 0.2s ease;
}

.image-container img:hover {
  transform: scale(1.1);
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
