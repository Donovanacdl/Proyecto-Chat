const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const { EVENTS } = require('@bot-whatsapp/bot');
require('dotenv').config()

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const path = require("path");
const fs = require("fs");
const chat = require("./ChatGPT");

const menuPath = path.join(__dirname, "mensajes", "menu.txt");
const menu = fs.readFileSync(menuPath, "utf8");

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])


const flowModelos = addKeyword(EVENTS.ACTION)
    .addAnswer('Este es nuestro catalogo de todos nuestros modelos')
    .addAnswer('Si desea regresar al Menu escribanos nuevamente', {
        media: "https://www.bonanza.com.do/wp-content/uploads/2022/12/Screen-Shot-2022-12-12-at-9.25.36-AM.png"
    })

const flowModeloesp = addKeyword(EVENTS.ACTION)
    .addAnswer('Estos son los datos del modelo solicitado')
    .addAnswer('Si desea regresar al Menu escribanos nuevamente', {
        media: "https://www.bonanza.com.do/wp-content/uploads/2022/12/Screen-Shot-2022-12-12-at-9.25.36-AM.png"
    })

const flowPruebamanejo = addKeyword(EVENTS.ACTION)
    .addAnswer('Prueba de manejo')

const flowFinanciamiento = addKeyword(EVENTS.ACTION)
    .addAnswer('Aquí podría solicitar su Financiamiento: www.bonanza.com.do/solicitudes-credito')
    .addAnswer('Si desea regresar al Menu escribanos nuevamente')

const flowConsultas = addKeyword(EVENTS.ACTION)
    .addAnswer('Esta es la sección de CONSULTAS')
/*    .addAnswer("Por favor haga su consulta", {capture:true}, async(ctx, ctxFn) => {
        const prompt = "Responde Hola"
        const consulta = ctx.body
        const answer = await chat(prompt, consulta)
        console.log(answer.content)
    }) */

const flowCotizacion = addKeyword(EVENTS.ACTION)
    .addAnswer('Cotización')
    .addAnswer('Si desea regresar al Menu escribanos nuevamente')

const flowAsesor = addKeyword(EVENTS.ACTION)
    .addAnswer('ASESOR')
      



const menuFlow = addKeyword(EVENTS.WELCOME)
    .addAnswer("Bienvenido al whatsapp de GRUPO BONANZA")
    .addAnswer(menu,
    {capture: true },
    async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        if (!["1", "2", "3", "4", "5", "6", "7", "0"].includes(ctx.body)) {
            return fallBack(
                "Respuesta no válida, por favor selecciona una de las opciones."
            );
        }
        switch (ctx.body) {
            case "1":
                return gotoFlow(flowModelos);
            case "2":
                return gotoFlow(flowModeloesp);
            case "3":
                return gotoFlow(flowPruebamanejo);
            case "4":
                return gotoFlow(flowFinanciamiento);
            case "5":
                return gotoFlow(flowConsultas);
            case "6":
                return gotoFlow(flowCotizacion);
            case "7":
                console.log(ctx.from) 
                return gotoFlow(flowAsesor);
            case "0":
                return await flowDynamic(
                    "Saliendo... Puedes volver a acceder a este menú escribiendonos nuevamente"
                );
            }
        });

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, menuFlow, flowModelos, flowModeloesp, flowPruebamanejo, flowFinanciamiento, flowConsultas, flowCotizacion, flowAsesor])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
