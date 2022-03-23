const APIKEY = 'f6ac922f696523ee05fb92cdea87b084'
const $input = $('input')
const $button = $('button')

$button.on('click', () => {
    const city = $input.val()

    $.ajax(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKEY}`). then((data) => {
        console.log(data)
    })
})
    