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
      p.style.color = '#901C1C';
      p.style.marginBottom = '-10px';
      const taglineElement = document.createElement('p');
      taglineElement.textContent = tagline;
      const priceElement = document.createElement('p');
      priceElement.textContent = `${price}€/jour`;
      priceElement.style.marginTop = '-10px';
    
      article.appendChild(img);
      article.appendChild(h2);
      article.appendChild(p);
      article.appendChild(taglineElement);
      article.appendChild(priceElement);
      return article;
    }
  
    return { id, name, tagline, city, country, price, portrait, picture, getUserCardDOM };
  }