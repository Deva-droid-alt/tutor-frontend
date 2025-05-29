<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
      <!-- Modal backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('close')"></div>
      
      <!-- Modal content -->
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 z-10 overflow-hidden">
        <!-- Modal header -->
        <div class="bg-purple-50 p-4 flex justify-between items-center border-b border-gray-200">
          <h3 class="text-xl font-bold text-purple-800">Tutor Details</h3>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Modal body with scrollable content -->
        <div class="p-6 max-h-[80vh] overflow-auto">
          <!-- Tutor profile header -->
          <div class="flex flex-col items-center mb-6">
            <img :src="tutor.avatar" alt="Tutor Avatar" class="w-24 h-24 rounded-full object-cover border-4 border-pink-300 mb-3" />
            <h2 class="text-xl font-bold text-center">{{ tutor.name }}</h2>
            <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
              {{ tutor.subject }}
            </span>
          </div>
          
          <!-- Tutor details -->
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Location</p>
                <p class="font-medium">{{ tutor.location }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Experience</p>
                <p class="font-medium">{{ tutor.years_of_experience }} years</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Education</p>
                <p class="font-medium">{{ tutor.education_level }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Gender</p>
                <p class="font-medium">{{ tutor.gender }}</p>
              </div>
            </div>
            
            <div>
              <p class="text-sm text-gray-500">Contact Information</p>
              <div class="mt-1 space-y-1">
                <p class="flex items-center">
                  <span class="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  {{ tutor.email }}
                </p>
                <p class="flex items-center">
                  <span class="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  {{ tutor.phone_number }}
                </p>
              </div>
            </div>
            
            <div>
              <p class="text-sm text-gray-500">Skills</p>
              <div class="mt-2 flex flex-wrap gap-2">
                <span class="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm">
                  {{ tutor.skill_name }}
                </span>
                <span class="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                  {{ tutor.skill_category }}
                </span>
                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {{ tutor.skill_level }}
                </span>
              </div>
            </div>
            
            <div>
              <p class="text-sm text-gray-500">Degree</p>
              <p>{{ tutor.degree }}</p>
            </div>
            
            <div>
              <p class="text-sm text-gray-500">Major</p>
              <p>{{ tutor.major }}</p>
            </div>
          </div>
        </div>
        
        <!-- Modal footer -->
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button 
            @click="$emit('close')" 
            class="bg-violet-600 text-white px-6 py-2 rounded-full font-medium hover:bg-violet-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    tutor: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    }
  });
  
  defineEmits(['close']);
  </script>
  
  