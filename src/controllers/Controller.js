var request = require('request')

const { JSDOM } = require('jsdom')

module.exports = {
    async get(req, res) {
        const getUri = 'http://www.fazenda.pr.gov.br/nfce/qrcode/?p=' + req.params.nfc_qrcode

        request({
            uri: getUri
        }, function(error, response, body){
            const dom = new JSDOM(body);
            var document = dom.window.document
            var productsTableDOM = document.getElementById('tabResult')
            var nfcTotalDOM = document.getElementById('totalNota')
            var nfcInfoDOM = document.getElementById('infos')

            var productsJson = []
            var listinhaJson = []

            // Para cada Item (tr) cria um producto e adiciona em productsJson
            for (i = 0; i < productsTableDOM.rows.length; i++)
                productsJson.push(
                    {
                        "description": productsTableDOM.rows[i].cells[0].getElementsByClassName('txtTit2')[0].textContent,
                        "total": productsTableDOM.rows[i].cells[1].getElementsByClassName('valor')[0].textContent.replace(",", "."),
                        "quantity": productsTableDOM.rows[i].cells[0].getElementsByClassName('Rqtd')[0].textContent.split(":").pop().replace(/(\r\n|\n|\r)/gm, "").trim().replace(",", "."),
                        "unity": productsTableDOM.rows[i].cells[0].getElementsByClassName('RUN')[0].textContent.split(":").pop().replace(/(\r\n|\n|\r)/gm, "").trim(),
                        "unityPrice": productsTableDOM.rows[i].cells[0].getElementsByClassName('RvlUnit')[0].textContent.split(":").pop().replace(/(\r\n|\n|\r)/gm, "").trim().replace(",", "."),
                    }
                )

            listinhaJson.push(
                {
                    "id": nfcInfoDOM.querySelector('li').textContent.split("Emissão: ").pop().split("-").shift().trim().replace(" ", "_"),
                    "date": nfcInfoDOM.querySelector('li').textContent.split("Emissão: ").pop().split(" ").shift().replace(/(\r\n|\n|\r)/gm, "").trim(),
                    "quantity": nfcTotalDOM.getElementsByClassName('totalNumb')[0].textContent,
                    "total": nfcTotalDOM.getElementsByClassName('totalNumb')[1].textContent.replace(",", "."),
                    "paymentType": nfcTotalDOM.getElementsByClassName('tx')[0].textContent,
                    "products": [ productsJson ],
                }
            )

            return res.json(listinhaJson)
        })
    }
}