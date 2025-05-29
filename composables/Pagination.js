// composables/usePagination.js
export default function usePagination() {
    const page = ref(1)
    const limit = ref(9)
    const total = ref(0)
    
    const setTotal = (value) => {
      total.value = value
    }
    
    const totalPages = computed(() => {
      return Math.ceil(total.value / limit.value)
    })
    
    const nextPage = () => {
      if (page.value < totalPages.value) {
        page.value++
      }
    }
    
    const prevPage = () => {
      if (page.value > 1) {
        page.value--
      }
    }
    
    const goToPage = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages.value) {
        page.value = pageNumber
      }
    }
    
    return {
      page,
      limit,
      total,
      setTotal,
      totalPages,
      nextPage,
      prevPage,
      goToPage
    }
  }