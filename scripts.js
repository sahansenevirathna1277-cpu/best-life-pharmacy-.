/* === scripts.js === */
document.addEventListener('DOMContentLoaded', () => {
  console.log('Pharmacy site loaded.');

  // Cart Counter Logic
  const cartBadge = document.getElementById('cart-count');
  const addButtons = document.querySelectorAll('.add-to-cart-btn');

  let cartCount = 0;

  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartCount++;
      cartBadge.textContent = cartCount;
      
      // Fun animation on button
      const originalText = btn.innerHTML;
      btn.innerHTML = `<i class="fa-solid fa-check"></i> Added`;
      btn.classList.add('btn-success');
      btn.classList.remove('btn-outline-custom');
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('btn-success');
        btn.classList.add('btn-outline-custom');
      }, 1500);
    });
  });

  // Prescription Upload File Drag & Drop Simulation
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('prescriptionFile');

  if (uploadArea) {
    uploadArea.addEventListener('click', () => {
      fileInput.click();
    });

    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', function() {
      handleFiles(this.files);
    });
  }

  function handleFiles(files) {
    if (files.length > 0) {
      const fileName = files[0].name;
      uploadArea.innerHTML = `
        <i class="fa-solid fa-file-medical upload-icon text-success"></i>
        <h5 class="text-success mt-2">File Selected</h5>
        <p class="text-muted mb-0">${fileName}</p>
        <p class="small mt-2" style="text-decoration: underline;">Click to change file</p>
      `;
    }
  }
  }

  // Category Filtering Logic
  const categoryFilters = document.querySelectorAll('.category-filter');
  const productItems = document.querySelectorAll('.product-item');

  if (categoryFilters.length > 0) {
    categoryFilters.forEach(filter => {
      filter.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active styling from all filters
        categoryFilters.forEach(f => {
          f.classList.remove('text-primary-custom', 'fw-bold');
          f.classList.add('text-muted');
        });
        
        // Add active styling to clicked filter
        e.currentTarget.classList.add('text-primary-custom', 'fw-bold');
        e.currentTarget.classList.remove('text-muted');
        
        const selectedCategory = e.currentTarget.dataset.filter;
        
        // Filter products
        productItems.forEach(item => {
          if (selectedCategory === 'all' || item.dataset.category === selectedCategory) {
            item.style.display = 'block';
            // Slight fade in animation
            item.style.opacity = '0';
            setTimeout(() => { item.style.opacity = '1'; item.style.transition = 'opacity 0.3s ease'; }, 50);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
});
