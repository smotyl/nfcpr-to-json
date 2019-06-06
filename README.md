# nfcpr-to-json

Retorno de dados da NFC em formato Json.

API em NodeJS utilizando Express e jsdom.

# Instruções

get - A função get funciona pelo seguinte endereço:

'http://192.168.0.10:3001/api/get/' + chave da NFC fornecido pelo QR Code

A chave da NFC é encontrada no url fornecido pelo QR Code após o prefixo "qrcode/?p="

Exemplo:

fonte de dados:
http://www.fazenda.pr.gov.br/nfce/qrcode/?p=41190677883320001486650200001136591204702878%7C2%7C1%7C1%7C8E3B18DEE048DD07EF042E0B0A822344801FE5FE

endereço da api:
'http://192.168.0.10:3001/api/get/' + '41190677883320001486650200001136591204702878%7C2%7C1%7C1%7C8E3B18DEE048DD07EF042E0B0A822344801FE5FE'

