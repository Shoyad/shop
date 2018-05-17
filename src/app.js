const telegraf = require('telegraf')
const {Extra, Markup} = require('telegraf')

const { Observer } = require('./Observer')

const bot = new telegraf('563637760:AAFUfeLWdcFvgmdpB1Y034DjH43RVx2wgyI')

function bar(products) {
  return products.length > 0 ? 'У вас товар' : 'Нет товара'
}

let products = []

const observer = new Observer();

bot.start(ctx => {

  ctx.reply(bar(products), Extra.HTML().markup(m => m.inlineKeyboard([m.callbackButton("🌄 Товар", "product")])))
})

bot.action("product", ctx => {
  ctx.editMessageText("Test lorem ipsum \n<a href=\"http://www.planwallpaper.com/static/images/i-should-buy-a-boat.jpg\">&#160;</a>",
    Extra.HTML().markup(m => m.inlineKeyboard([m.callbackButton("📥 Add to basket", "add")])))
})

observer.on(data => {
  console.log("add was fired", data)
})

bot.action("add", ctx=> {

  products[ctx.from.id] = 1

  observer.emit({someData: ctx.from.id})

  ctx.editMessageText(bar(products), Extra.HTML().markup(m => m.inlineKeyboard([m.callbackButton("Товар", "product")])))
})





bot.startPolling();