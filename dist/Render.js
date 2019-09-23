class Renderer {

    renderLI(LogIn) {
        $(".sidenav-trigger").empty()
    }

    rTravelers(tmp, elm, trvs) {
        const source = $(tmp).html()
        const template = Handlebars.compile(source)
        let newHTML = template({ trvs })
        $(elm).empty().append(newHTML)
    }

    renderImg(tmp, elm, Data) {
        const source = $(tmp).html()
        const template = Handlebars.compile(source)
        let newHTML = template({ Data })
        $(".pic").empty()
        $(elm).append(newHTML)
    }
}



