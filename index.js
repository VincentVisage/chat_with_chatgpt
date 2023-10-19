function submitForm(e){
    e.preventDefault(); // обновляет страницу после события
    getData();
}

async function getData(){
    let userData = document.getElementById("input").value.trim(); // получаем данные из инпута
    if(userData === "") return false; // проверка наличия данных

    const API = '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' // наш API ключ это GPT

    document.getElementById("messages").innerHTML = `<div class="mess-user">
        <p>${userData} </p>
    </div>` + document.getElementById("messages").innerHTML
    document.getElementById("input").value = ""

    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', { // обращаемся к серверу записывая ответ в переменную response
            method: 'POST', // тип запроса
            headers: {
                'Authorization': `Bearer ${API}`, // передаем на API-ключ
                'Content-Type': "application/json" // тип данных которые мы будем получать
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', 
                messages: [{role: 'user', content: userData}],
                max_tokens: 100
            })
        })
        const data = await response.json()

        console.log(data)

        document.getElementById("messages").innerHTML = `<div class="mess-chat">
            <p>${data.choices[0].message.content} </p>
        </div>` + document.getElementById("messages").innerHTML


    } catch(error){
        console.error('Error ', error)
    }


}