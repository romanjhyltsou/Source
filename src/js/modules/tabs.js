const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') =>{
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

          function hideTabContent(){
            content.forEach(item =>{ 
                item.style.display = 'none';  /* скрыли весь контент */ 
            });
            
            tab.forEach(item =>{
                item.classList.remove(activeClass);  /* скрыли все табы */
            });
          }

          function showTabContent(i = 0){
            content[i].style.display = display;  /* показываем один блок */
            tab[i].classList.add(activeClass); /* показываем один блок */
          }

          hideTabContent();
          showTabContent();

          header.addEventListener('click', (e)=>{
              const target = e.target;
              if( target &&
                  (target.classList.contains(tabSelector.replace(/\./, "")) || /*  с помощью регулярного выражения 
                  заменить точку у tabSelector на пробел */
              target.parentNode.classList.contains(tabSelector.replace(/\./, "")))){ /* или если кликнули на дочерний 
              элемент и у его родителя(parentNode)  есть класс  tabSelector, то true */
                tab.forEach((item, i)=>{
                    if(target === item || target.parentNode === item){ /* если элемент на 
                        которвый(target ) кликнул пользователь равен элементу(item) который пребираеться в forEach  или
                        дочерний родитель равен элементу(item) который пребираеться в forEach  */ 
                        hideTabContent();
                        showTabContent(i);
                    }
                });
              }

          });
};

export default tabs;