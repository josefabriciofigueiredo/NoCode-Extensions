function idiomaSelecionado() {
    var idioma = new URLSearchParams(window.location.search).get('lang')
    return idioma != null ? idioma : "BR"
}

function idiomaPagina(idioma) {
    var url_params = new URLSearchParams(window.location.search)
    var pagina = url_params.get('pag')
    var url = window.location.href.split("#")[0].split("?")[0]

    window.location.href = url + "?pag=" + pagina + "&lang=" + idioma
}

function atualizarIdiomaPagina() {
    document.getElementById("conteudo-extensao").innerText = (idiomaSelecionado() == "BR" ? "Extensões" : "Extensions")
    document.getElementById("conteudo-navapis-extensao").innerText = (idiomaSelecionado() == "BR" ? "Extensões" : "Extensions")
    document.getElementById("conteudo-nestapagina").innerText = (idiomaSelecionado() == "BR" ? "Nesta Página" : "This Page")
    document.getElementById("conteudo-idioma").innerText = (idiomaSelecionado() == "BR" ? "Idioma" : "Language")
    document.getElementById("btn-idioma").innerHTML = '<svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13 2.04932C13 2.04932 16 5.99994 16 11.9999C16 17.9999 13 21.9506 13 21.9506" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 21.9506C11 21.9506 8 17.9999 8 11.9999C8 5.99994 11 2.04932 11 2.04932" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2.62964 15.5H21.3704" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2.62964 8.5H21.3704" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> ' + ((idiomaSelecionado() != null) ? (idiomaSelecionado() == "BR" ? "Português (Brasil)" :  "English (US)") : "Português (Brasil)")
}
atualizarIdiomaPagina()

fetch('https://raw.githubusercontent.com/josefabriciofigueiredo/NoCode-Extensions/main/doc.json')
    .then(response => response.json())
    .then(data => {
        var pagina_encontrada = false
        for (var extensao in data) {
            var titulo = data[extensao]["nome"]
            var diretorio = data[extensao]["diretorio"]
            var subtitulos = data[extensao]["conteudo"]
            var linkTutorial = data[extensao]["tutorial"]

            // Nav - Extensões
            var tag_li = document.createElement("li")
            var tag_a = document.createElement("a")
            tag_a.href = "doc.html?pag=" + diretorio
            tag_a.classList.add("fs-6")
            tag_a.textContent = titulo
            tag_li.appendChild(tag_a)
            document.getElementById("ul-nav-apis").appendChild(tag_li)

            var tag_li_2 = document.createElement("li")
            var tag_a_2 = document.createElement("a")
            tag_a_2.href = "doc.html?pag=" + diretorio
            tag_a_2.classList.add('fs-6', 'text-white', 'ms-3')
            tag_a_2.textContent = titulo
            tag_li_2.appendChild(tag_a_2)
            document.getElementById("ul-nav-extensoes").appendChild(tag_li_2)


            if (extensao == new URLSearchParams(window.location.search).get('pag')) {
                pagina_encontrada = true
                var itemCont = 1

                // Titulo
                var h1_titulo = document.createElement('h1')
                h1_titulo.innerText = titulo
                document.getElementById("s-2").appendChild(h1_titulo)

                // Descrição
                var p_descricao = document.createElement('p')
                p_descricao.innerText = (idiomaSelecionado() == "BR" ? data[extensao]["descricao-br"] : data[extensao]["descricao-eua"])
                document.getElementById("s-2").appendChild(p_descricao)

                // Donwloads
                var object_download = {
                    extensao: {
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dropbox text-dark" viewBox="0 0 16 16"> <path d="M8.01 4.555 4.005 7.11 8.01 9.665 4.005 12.22 0 9.651l4.005-2.555L0 4.555 4.005 2 8.01 4.555Zm-4.026 8.487 4.006-2.555 4.005 2.555-4.005 2.555-4.006-2.555Zm4.026-3.39 4.005-2.556L8.01 4.555 11.995 2 16 4.555 11.995 7.11 16 9.665l-4.005 2.555L8.01 9.651Z" /></svg>',
                        link: data[extensao]['link-extensao'],
                        idioma: idiomaSelecionado() == 'BR' ? 'Extensão' : 'Extension'
                    },
                    appTeste: {
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-android2 text-dark" viewBox="0 0 16 16"> <path d="m10.213 1.471.691-1.26c.046-.083.03-.147-.048-.192-.085-.038-.15-.019-.195.058l-.7 1.27A4.832 4.832 0 0 0 8.005.941c-.688 0-1.34.135-1.956.404l-.7-1.27C5.303 0 5.239-.018 5.154.02c-.078.046-.094.11-.049.193l.691 1.259a4.25 4.25 0 0 0-1.673 1.476A3.697 3.697 0 0 0 3.5 5.02h9c0-.75-.208-1.44-.623-2.072a4.266 4.266 0 0 0-1.664-1.476ZM6.22 3.303a.367.367 0 0 1-.267.11.35.35 0 0 1-.263-.11.366.366 0 0 1-.107-.264.37.37 0 0 1 .107-.265.351.351 0 0 1 .263-.11c.103 0 .193.037.267.11a.36.36 0 0 1 .112.265.36.36 0 0 1-.112.264Zm4.101 0a.351.351 0 0 1-.262.11.366.366 0 0 1-.268-.11.358.358 0 0 1-.112-.264c0-.103.037-.191.112-.265a.367.367 0 0 1 .268-.11c.104 0 .19.037.262.11a.367.367 0 0 1 .107.265c0 .102-.035.19-.107.264ZM3.5 11.77c0 .294.104.544.311.75.208.204.46.307.76.307h.758l.01 2.182c0 .276.097.51.292.703a.961.961 0 0 0 .7.288.973.973 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h1.343v2.182c0 .276.097.51.292.703a.972.972 0 0 0 .71.288.973.973 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h.76c.291 0 .54-.103.749-.308.207-.205.311-.455.311-.75V5.365h-9v6.404Zm10.495-6.587a.983.983 0 0 0-.702.278.91.91 0 0 0-.293.685v4.063c0 .271.098.501.293.69a.97.97 0 0 0 .702.284c.28 0 .517-.095.712-.284a.924.924 0 0 0 .293-.69V6.146a.91.91 0 0 0-.293-.685.995.995 0 0 0-.712-.278Zm-12.702.283a.985.985 0 0 1 .712-.283c.273 0 .507.094.702.283a.913.913 0 0 1 .293.68v4.063a.932.932 0 0 1-.288.69.97.97 0 0 1-.707.284.986.986 0 0 1-.712-.284.924.924 0 0 1-.293-.69V6.146c0-.264.098-.491.293-.68Z" /></svg>',
                        link: data[extensao]['link-app'],
                        idioma: idiomaSelecionado() == 'BR' ? 'App Teste' : 'Test App'
                    },
                    codigo: {
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-files text-dark" viewBox="0 0 16 16"> <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" /></svg>',
                        link: data[extensao]['link-nix'],
                        idioma: idiomaSelecionado() == 'BR' ? 'Código' : 'Code'
                    }
                }
                var ul_download = document.createElement("ul")
                ul_download.style.marginBottom = '50px'

                for (var chave in object_download) {
                    if (object_download.hasOwnProperty(chave)) {
                        var li_download = document.createElement("li")
                        li_download.classList.add('nav-item', 'ms-3', 'mb-2')

                        var a_download = document.createElement("a")
                        a_download.classList.add('link-primary', 'link-offset-2', 'link-underline-opacity-25', 'link-underline-opacity-100-hover', 'link-donwload')
                        a_download.innerHTML = object_download[chave]['icon'] + (idiomaSelecionado() == 'BR' ? ' Baixar ' : ' Download ') + object_download[chave]['idioma']
                        a_download.href = object_download[chave]['link']
                        li_download.appendChild(a_download)
                        ul_download.appendChild(li_download)
                    }
                }
                document.getElementById("s-2").appendChild(ul_download)

                // Tutorial
                if (linkTutorial != null) {
                    // Nav - Nesta Página
                    var tag_li = document.createElement('li')
                    var tag_a = document.createElement('a')
                    tag_a.href = '#item-' + itemCont
                    tag_a.classList.add('fs-6')
                    tag_a.innerText = 'Tutorial'
                    tag_li.appendChild(tag_a)
                    document.getElementById("ul-nav-in").appendChild(tag_li)

                    // Tutorial
                    const h4 = document.createElement('h4')
                    h4.id = "item-" + itemCont
                    h4.classList.add('scroll-offset')
                    h4.textContent = "Tutorial"
                    document.getElementById("s-2").appendChild(h4)

                    const iframe = document.createElement('iframe')
                    iframe.src = linkTutorial
                    iframe.title = 'YouTube video player'
                    iframe.frameBorder = '0'
                    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    iframe.referrerPolicy = 'strict-origin-when-cross-origin'
                    iframe.allowFullscreen = true

                    iframe.onload = function() {
                        var iframeWidth = iframe.offsetWidth
                        
                        this.style.height = iframeWidth * 315 / 560 + 'px';
                    };

                    document.getElementById("s-2").appendChild(iframe)
                    

                    itemCont++
                }

                for (const subtitulo in subtitulos) {
                    // Nav - Nesta Página
                    var tag_li = document.createElement('li')
                    var tag_a = document.createElement('a')
                    tag_a.href = '#item-' + itemCont
                    tag_a.classList.add('fs-6')
                    tag_a.innerText = subtitulo
                    tag_li.appendChild(tag_a)
                    document.getElementById("ul-nav-in").appendChild(tag_li)

                    // Subtitulo
                    var h4_subtitulo = document.createElement('h4')
                    h4_subtitulo.classList.add("scroll-offset")
                    h4_subtitulo.id = "item-" + itemCont
                    h4_subtitulo.innerText = subtitulo
                    document.getElementById("s-2").appendChild(h4_subtitulo)

                    // Imagem
                    var img = document.createElement('img')
                    img.src = "https://josefabriciofigueiredo.github.io/NoCode-Extensions/" + diretorio + "/img/" + subtitulos[subtitulo]["img"]
                    document.getElementById("s-2").appendChild(img)

                    // Tabela
                    var table = document.createElement('table')
                    var thead = document.createElement('thead')
                    var tbody = document.createElement('tbody')
                    var headerRow = document.createElement('tr')

                    // Tabela - Cabeçalho
                    var headers = ['Parâmetro', 'Type', 'Descrição']
                    headers.forEach(headerText => {
                        var tag_th = document.createElement('th')
                        tag_th.classList.add('text-center')
                        tag_th.innerText = headerText
                        headerRow.appendChild(tag_th)
                    })
                    thead.appendChild(headerRow);
                    table.appendChild(thead);

                    // Tabela - Linhas
                    for (const dadoTabela in subtitulos[subtitulo]["tabela"]) {
                        // Parâmetro
                        var row = document.createElement('tr')
                        var cell = document.createElement('td')
                        cell.classList.add('bg-secondary-subtle')
                        cell.innerText = dadoTabela
                        row.appendChild(cell)

                        // Tipo
                        var tipeCell = document.createElement('td')
                        var badgeSpan = document.createElement('span')
                        const typeClassMap = {
                            "TEXT": 'badge bg-danger',
                            "INT": 'badge bg-info',
                            "LIST": 'badge bg-info',
                            "DICTIONARY": 'badge bg-primary',
                            "BOOLEAN": 'badge bg-success'
                        }
                        const tipo = subtitulos[subtitulo]["tabela"][dadoTabela]["type"]
                        const classes = typeClassMap[tipo]
                        if (classes) {
                            badgeSpan.classList.add(...classes.split(' '))
                        }
                        badgeSpan.innerText = subtitulos[subtitulo]["tabela"][dadoTabela]["type"]
                        tipeCell.appendChild(badgeSpan)
                        row.appendChild(tipeCell)

                        // Descrição
                        var descricaoCell = document.createElement('td')
                        descricaoCell.classList.add('bg-secondary-subtle')
                        descricaoCell.innerText = subtitulos[subtitulo]["tabela"][dadoTabela]["descricao-" + idiomaSelecionado().toLowerCase()]
                        row.appendChild(descricaoCell)

                        tbody.appendChild(row)
                        table.appendChild(tbody)
                    }

                    document.getElementById("s-2").appendChild(table)

                    itemCont++
                }
            }
        }

        if (!pagina_encontrada) {
            document.getElementById('s-3').style.visibility = 'hidden'

            var p_naoEncontrado = document.createElement('p')
            p_naoEncontrado.classList.add('pag-nao_encontrada')
            p_naoEncontrado.innerHTML = idiomaSelecionado() == 'BR' ? '<b>404</b><br>Página não encontrada.' : '<b>404</b><br>Page not found'

            var s_2 = document.getElementById('s-2')
            s_2.classList.add('d-flex', 'justify-content-center')
            s_2.appendChild(p_naoEncontrado)
        }
    })
    .catch(error => console.error('Erro ao carregar o arquivo JSON:', error))