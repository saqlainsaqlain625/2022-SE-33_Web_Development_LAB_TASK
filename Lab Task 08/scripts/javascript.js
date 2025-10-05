 let allPosts = [];
    let currentPage = 1;
    let postsPerPage = 6;
    let currentCategory = "All";

    const categories = {
      1: "Technology", 2: "Travel", 3: "Coding", 4: "Health",
      5: "Lifestyle", 6: "Science", 7: "Business", 8: "Design",
      9: "News", 10: "Education"
    };

    // Function: Get category image (offline)
    function getCategoryImage(category) {
      const query = {
        "Technology": "technology.jpg",
        "Travel": "travel.jpg",
        "Coding": "coding.jpg",
        "Health": "health.jpg",
        "Lifestyle": "lifestyle.jpg",
        "Science": "science.jpg",
        "Business": "business.jpg",
        "Design": "design.jpg",
        "News": "news.jpg",
        "Education": "education.jpg"
      };
      return `assets/${query[category] || "default.jpg"}`;
    }

    // Fetch JSON
    fetch("./assets/posts.json")
      .then(res => res.json())
      .then(data => { allPosts = data; renderPosts(); });

    function renderPosts() {
      const container = document.getElementById("blog-container");
      container.innerHTML = "";

      let filtered = allPosts;
      if(currentCategory !== "All"){
        filtered = allPosts.filter(p => categories[p.userId] === currentCategory);
      }

      // Sorting
      const sortVal = document.getElementById("sortSelect").value;
      if(sortVal === "title"){ filtered = [...filtered].sort((a,b)=>a.title.localeCompare(b.title)); }
      if(sortVal === "id"){ filtered = [...filtered].sort((a,b)=>a.id-b.id); }

      // Pagination
      const start = (currentPage-1) * postsPerPage;
      const end = start + postsPerPage;
      const pagePosts = filtered.slice(start,end);

      pagePosts.forEach(post => {
        const card = document.createElement("div");
        card.classList.add("card");

        const shortBody = post.body.slice(0,100)+"...";
        const fullBody = post.body;
        const category = categories[post.userId];
        const imageUrl = getCategoryImage(category);

        card.innerHTML = `
          <img src="${imageUrl}" alt="${category}">
          <h2>${post.title}</h2>
          <p class="post-body">${shortBody}</p>
          <div class="tags">
            <span class="tag">Author: ${post.userId}</span>
            <span class="tag">Category: ${category}</span>
          </div>
          <div class="actions">
            <button class="like">❤️ Like</button>
            <button class="bookmark">🔖 Save</button>
            <button class="readmore">Read More</button>
          </div>
        `;

        // Actions
        const bodyEl = card.querySelector(".post-body");
        card.querySelector(".readmore").addEventListener("click", e=>{
          if(bodyEl.textContent === shortBody){ bodyEl.textContent = fullBody; e.target.textContent="Show Less"; }
          else { bodyEl.textContent = shortBody; e.target.textContent="Read More"; }
        });

        card.querySelector(".like").addEventListener("click", e=>{
          e.target.textContent = "❤️ Liked";
          e.target.disabled = true;
        });

        card.querySelector(".bookmark").addEventListener("click", e=>{
          localStorage.setItem("bookmark-"+post.id, JSON.stringify(post));
          e.target.textContent="✅ Saved";
        });

        container.appendChild(card);
      });
    }

    // Filters
    function filterCategory(cat){ currentCategory=cat; currentPage=1; renderPosts(); }
    document.getElementById("sortSelect").addEventListener("change", ()=>renderPosts());

    // Pagination
    function nextPage(){  
      let filtered = allPosts;  
      if(currentCategory !== "All"){  
        filtered = allPosts.filter(p => categories[p.userId] === currentCategory);  
      }  
      const totalPages = Math.ceil(filtered.length / postsPerPage);  
      if(currentPage < totalPages){  
        currentPage++;  
        renderPosts();  
      }  
    }
    function prevPage(){ if(currentPage>1){ currentPage--; renderPosts(); } }

    // Search
    document.getElementById("search").addEventListener("input", e=>{
      const key = e.target.value.toLowerCase();
      allPosts = allPosts.filter(p=>p.title.toLowerCase().includes(key) || p.body.toLowerCase().includes(key));
      currentPage=1; renderPosts();
    });

    // Dark mode toggle
    document.getElementById("toggleDark").addEventListener("click", ()=>{
      document.body.classList.toggle("dark");
      document.getElementById("toggleDark").textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });