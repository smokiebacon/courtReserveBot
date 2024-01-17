import puppeteer from "puppeteer"
;(async () => {
  const username = "phillippeet200@yahoo.com"
  const password = "Phi11ipc"
  const bookingDate = "2024/0/24" // 0 is January

  // Date.prototype.addDays = function (days) {
  //   var date = new Date(this.valueOf())
  //   date.setDate(date.getDate() + days)
  //   return date
  // }
  // let futureDate = todaysDate.addDays(8)
  // let day = futureDate.getDate() - 1
  // let month = futureDate.getMonth()
  // let year = futureDate.getFullYear()
  // let formattedDate = year + "/" + month + "/" + day
  // console.log(formattedDate, "formatted Date") // 2024/0/12

  const delay = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds))

  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false })

  const page = await browser.newPage()

  // Navigate the page to a URL
  await page.goto("https://app.courtreserve.com/")

  await page.waitForSelector("#Username")
  await page.type("#Username", username)
  await page.type("#Password", password)
  await page.click(".btn-submit")
  await page.waitForNavigation()
  await page.goto(
    "  https://app.courtreserve.com/Online/Reservations/Index/7110"
  )
  await page.waitForSelector(".k-i-calendar")

  await page.click(".k-i-calendar")
  await page.waitForSelector(".k-link")

  //taking in all available calender dates
  // const data = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll(".k-link")).map((d) =>
  //     d.getAttribute("data-value")
  //   )
  // )
  // console.log(data, "data")

  const foundDateElement = await page.$(`a[data-value="${bookingDate}"`) // format: 2024/0/17, January is 0
  await delay(500)
  foundDateElement.click()
  //select the desired Time Slot
  await delay(500)

  await page.evaluate(() => {
    const buttons = document.querySelectorAll("button")
    for (const button of buttons) {
      const startAttribute = button.getAttribute("start")
      const endAttribute = button.getAttribute("end")
      const instructoridAttribute = button.getAttribute("instructorid")
      const courtlabelAttribute = button.getAttribute("courtlabel")
      if (
        startAttribute ===
          "Wed Jan 24 2024 07:30:00 GMT-0800 (Pacific Standard Time)" &&
        endAttribute ===
          "Wed Jan 24 2024 08:00:00 GMT-0800 (Pacific Standard Time)" &&
        instructoridAttribute === "undefined" &&
        courtlabelAttribute === "Court #1"
      ) {
        button.click()
        break
      }
    }
  })

  await page.waitForSelector(".k-dropdown")
  const durationDropdownSelector = '[aria-labelledby="Duration_label"]'
  // // Click on the dropdown to open the options
  await page.click(durationDropdownSelector)
  // await page.waitForSelector(".k-list-item")
  await delay(500)
  // const ulSelector = "#Duration_listbox.k-list-ul" // adjust the selector
  // await page.waitForSelector(ulSelector)
  // // // Get the text content of the third li element
  // await page.evaluate((ulSelector) => {
  //   const ul = document.querySelector(ulSelector)
  //   console.log(ul, "world")
  //   const thirdLi = ul.querySelector("li:nth-child(2)")
  //   return thirdLi ? thirdLi.innerHTML : null
  // }, ulSelector)
  // console.log("hello")

  // console.log("Text content of the third li:", thirdLiText)
  // const listItemSelector = '.k-list-item[data-offset-index="2"]'
  // await page.click(listItemSelector)

  const buttonSelector = 'button[onclick="submitCreateReservationForm()"]'
  await page.click(buttonSelector)
})()
