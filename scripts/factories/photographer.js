function photographerFactory(data) {
    const { id, name, tagline, city, country, price, portrait } = data;
  
    const picture = `assets/photographers/${portrait}`;
  
    function getUserCardDOM() {
      const article = document.createElement('article');
      const img = document.createElement('img');
      img.setAttribute('src', picture);
      img.setAttribute('alt', name);

      function getPhotographerData(id) {

        for (let i = 0; i < data.length; i++) {
          if (data[i].id === id) {
            return data[i];
          }
        }
        return null; 
      }


      const imgLink = document.createElement('a');
      imgLink.href = `photographer.html?id=${id}`;
      imgLink.appendChild(img);
    
      const h2 = document.createElement('h2');
      h2.textContent = name;
    

      const h2Link = document.createElement('a');
      h2Link.href = `photographer.html?id=${id}`;
      h2Link.appendChild(h2);
    
      const p = document.createElement('p');
      p.textContent = `${city}, ${country}`;
      p.style.color = '#901C1C';
      p.style.marginBottom = '-10px';
      const taglineElement = document.createElement('p');
      taglineElement.textContent = tagline;
      const priceElement = document.createElement('p');
      priceElement.textContent = `${price}€/jour`;
      priceElement.style.marginTop = '-10px';
      priceElement.style.color = '#757575';
    
      article.appendChild(imgLink);
      article.appendChild(h2Link);
      article.appendChild(p);
      article.appendChild(taglineElement);
      article.appendChild(priceElement);
      return article;
    }
    
  
    return { id, name, tagline, city, country, price, portrait, picture, getUserCardDOM };
  }