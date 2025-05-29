<template>
  <div class="navbar">
    <div class="navbar-left">
      <div class="logo"></div>
    </div>

    <div class="navbar-center">
      <div class="company-name">TutorLink</div>
    </div>

    <div class="navbar-right">
      <ul>
        <li><NuxtLink to="/home" class="nav-link">Home</NuxtLink></li>
        <li><NuxtLink to="/home#faq" class="nav-link">FAQ</NuxtLink></li>
        <li><NuxtLink to="/home#about" class="nav-link">About</NuxtLink></li>
      </ul>

      <div class="user-dropdown">
        <button @click="toggleDropdown" class="dropdown-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </button>
        <div v-if="isDropdownOpen" class="dropdown-menu">
          <button @click="editUser">Edit</button>
          <button @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Add these functions to handle user interactions
const editUser = () => {
  // Implement user edit functionality
  console.log('Edit user clicked');
  isDropdownOpen.value = false;
};

const logout = () => {
  // Implement logout functionality
  console.log('Logout clicked');
  isDropdownOpen.value = false;
};
</script>

<style scoped>

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  z-index: 1000;
  background-color: white;
}

.navbar-left {
  flex: 1;
}

.navbar-left .logo {
  font-size: 24px;
  font-weight: bold;
  color: #022344;
  letter-spacing: 1px;
}

.navbar-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.navbar-center .company-name {
  font-size: 28px;
  color: #0fa2ec;
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.navbar-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
}

.navbar-right ul {
  display: flex;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.navbar-right .nav-link {
  padding: 8px 16px;
  border-radius: 8px;
  color: #0b0b0b;
  font-weight: bold;
  transition: color 0.3s ease, background-color 0.3s ease;
  text-decoration: none;
}

.navbar-right .nav-link:hover {
  color: #0c8bd6;
  background-color: rgba(12, 139, 214, 0.1);
}

.user-dropdown {
  position: relative;
}

.dropdown-button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  color: #254267;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
}

.dropdown-button:hover {
  background-color: rgba(37, 66, 103, 0.1);
}

.dropdown-button .icon {
  width: 24px;
  height: 24px;
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  z-index: 10;
  min-width: 150px;
}

.dropdown-menu button {
  display: block;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  color: #333;
  transition: background-color 0.2s ease;
}

.dropdown-menu button:hover {
  background-color: #7a7eec;
  color: white;
}

/* Responsive styles */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 16px;
    gap: 12px;
  }
  
  .navbar-left, .navbar-right {
    width: 100%;
    justify-content: center;
  }
  
  .navbar-center {
    position: relative;
    left: 0;
    transform: none;
    margin: 8px 0;
  }
  
  .navbar-right ul {
    justify-content: center;
    width: 100%;
  }

  .logo{
    width: 50px;
    height: 50px;
    background-image: url('/3d-letter-t_313905-2597-removebg-preview.png'); /* Replace with your logo path */
    background-size: cover;
    background-position: center;
  }
}
</style>