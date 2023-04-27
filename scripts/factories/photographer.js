function photographerFactory(data) {
    const { id, name, tagline, city, country, price, portrait } = data;
  
    const picture = `assets/photographers/${portrait}`;
  
    function getUserCardDOM() {
      const article = document.createElement('article');
      const img = document.createElement('img');
      img.setAttribute('src', picture);
      const h2 = document.createElement('h2');
      h2.textContent = name;
      const p = document.createElement('p');
      p.textContent = `${city}, ${country}`;
      article.appendChild(img);
      article.appendChild(h2);
      article.appendChild(p);
      return article;
    }
  
    return { id, name, tagline, city, country, price, portrait, picture, getUserCardDOM };
  }