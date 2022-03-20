const forms = () =>{
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          phoneInput = document.querySelectorAll('input[name="user_phone"]');

          phoneInput.forEach(item =>{
                item.addEventListener('input', ()=>{
                    item.value = item.value.replace(/\D/,'');
                });
          });

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжимся.',
        failur: 'Что-то пошло не так...'
    };

    const postDtata = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });
        console.log(res);
        return await res.text();
    };

    const clearInputs = () =>{
        inputs.forEach(item =>{
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            postDtata('assets/server.php',formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failur)
                .finally(()=>{
                    clearInputs();
                    setTimeout(()=>{
                        statusMessage.remove();
                    }, 5000);
                });


        });
    });
};

export  default forms;