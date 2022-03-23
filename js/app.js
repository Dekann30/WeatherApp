const APIKEY = 'f6ac922f696523ee05fb92cdea87b084'
const $input = $('input')
const $button = $('button')

$button.on('click', () => {
    const city = $input.val()

    $.ajax(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKEY}`). then((data) => {
        const lat = data[0].lat
        const lon = data[0].lon
        $('#city').text(data[0].name)

        $.ajax(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=imperial&appid=${APIKEY}`).then((data2) => {
            $('#temp').text(`${Math.trunc(data2.current.temp)}°`)
            $('#feels-like').text(`${Math.trunc(data2.current.feels_like)}°`)

            const mainW = data2.current.weather[0].main
            const descriptionW = data2.current.weather[0].description

            const capLetters = descriptionW.split(' ')

            for (let i = 0; i < capLetters.length; i+=1) {
                capLetters[i] = capLetters[i].charAt(0).toUpperCase() + capLetters[i].substr(1)
            }
            
            const descrCap = capLetters.join(' ')
            $('#weather').text(`${mainW} - ${descrCap}`)

            const $png = $('<img id="png">')
            $png.attr('src', `http://openweathermap.org/img/wn/${data2.current.weather[0].icon}@2x.png`)
            $png.appendTo('.icon')

            $button.on('click', () => {
                $('.icon').children().last().remove()})
        })
    })
})
    