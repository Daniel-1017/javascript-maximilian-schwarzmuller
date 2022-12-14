class DOMHelper {
  static clearEventListeners(element) {
    const cloneElement = element.cloneNode(true)
    element.replaceWith(cloneElement)
    return cloneElement
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId)
    const destinationElement = document.querySelector(newDestinationSelector)
    destinationElement.append(element)
    element.scrollIntoView({ behavior: "smooth" })
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId)
    } else {
      this.hostElement = document.body
    }
    this.insertBefore = insertBefore
  }

  detach() {
    if (this.element) {
      this.element.remove()
      // this.element.parentElement.removeChild(thsi.element)
    }
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "afterbegin" : "beforeend",
      this.element
    )
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId)
    this.closeNotifier = closeNotifierFunction
    this.text = text
    this.create()
  }

  closeTooltip = () => {
    this.detach()
    this.closeNotifier()
  }

  create() {
    const tooltipEl = document.createElement("div")
    tooltipEl.className = "card"
    const tooltipTemplate = document.getElementById("tooltip")
    const tooltipBody = document.importNode(tooltipTemplate.content, true)
    tooltipBody.querySelector("p").textContent = this.text
    tooltipEl.append(tooltipBody)

    const hostElPosTop = this.hostElement.offsetTop
    const hostElPosLeft = this.hostElement.offsetLeft
    const hostElHeight = this.hostElement.clientHeight
    const parentElScrolling = this.hostElement.parentElement.scrollTop

    const x = hostElPosLeft + 20
    const y = hostElPosTop + hostElHeight - parentElScrolling - 10

    tooltipEl.style.position = "absolute"
    tooltipEl.style.left = `${x}px`
    tooltipEl.style.top = `${y}px`

    tooltipEl.addEventListener("click", this.closeTooltip)
    this.element = tooltipEl
  }
}

class ProjectItem {
  hasActiveTooltip = false

  constructor(id, updateProjectLitsFunction, type) {
    this.id = id
    this.updateProjectLitsHandler = updateProjectLitsFunction
    this.connectMoreInfoButton()
    this.connectSwitchButton(type)
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) return
    const projectElement = document.getElementById(this.id)
    const tooltipText = projectElement.dataset.extraInfo
    const tooltip = new Tooltip(
      () => (this.hasActiveTooltip = false),
      tooltipText,
      this.id
    )
    tooltip.attach()
    this.hasActiveTooltip = true
  }

  connectMoreInfoButton() {
    const prjItemEl = document.getElementById(this.id)
    const moreInfoBtn = prjItemEl.querySelector("button:first-of-type")
    moreInfoBtn.addEventListener("click", this.showMoreInfoHandler.bind(this))
  }

  connectSwitchButton(type) {
    const prjItemEl = document.getElementById(this.id)
    let switchBtn = prjItemEl.querySelector("button:last-of-type")
    switchBtn = DOMHelper.clearEventListeners(switchBtn)
    switchBtn.textContent = type === "active" ? "Finish" : "Activate"
    switchBtn.addEventListener(
      "click",
      this.updateProjectLitsHandler.bind(null, this.id)
    )
  }

  update(updateProjectListsFn, type) {
    this.updateProjectLitsHandler = updateProjectListsFn
    this.connectSwitchButton(type)
  }
}

class ProjectList {
  projects = []

  constructor(type) {
    this.type = type
    const prjItems = document.querySelectorAll(`#${type}-projects li`)
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProjects.bind(this), this.type)
      )
    }
  }

  setSwitchHanlderFunction(switchHandler) {
    this.switchHandler = switchHandler
  }

  addProject(project) {
    this.projects.push(project)
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`)
    project.update(this.switchProjects.bind(this), this.type)
  }

  switchProjects(projectId) {
    this.switchHandler(this.projects.find(p => p.id === projectId))
    this.projects = this.projects.filter(p => p.id !== projectId)
  }
}

class App {
  static init() {
    const activeProjectList = new ProjectList("active")
    const finishedProjectList = new ProjectList("finished")
    activeProjectList.setSwitchHanlderFunction(
      finishedProjectList.addProject.bind(finishedProjectList)
    )
    finishedProjectList.setSwitchHanlderFunction(
      activeProjectList.addProject.bind(activeProjectList)
    )

    // document
    //   .getElementById("start-analytics-btn")
    //   .addEventListener("click", this.startAnalytics)

    // const timerId = setTimeout(this.startAnalytics, 3000)
    document
      .getElementById("stop-analytics-btn")
      .addEventListener("click", () => {
        clearTimeout(timerId)
      })
  }

  static startAnalytics() {
    const analyticsScript = document.createElement("script")
    analyticsScript.src = "./assets/scripts/analytics.js"
    analyticsScript.defer = true
    document.head.append(analyticsScript)
  }
}

App.init()

// LOCATION, HISTORY, NAVIGATOR, DATES & ERRORS

// location
console.log("location", location)
console.log("host", location.host)
console.log("pathname", location.pathname)
location.http = "http://localhost:3000"

// history
history.back()
history.forward()
history.length
history.go(5)

// navigator
console.log(navigator.userAgent)
navigator.clipboard
navigator.geolocation.getCurrentPosition(data => {
  console.log(data)
})

// date
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
console.log(day, month, year)

// errors
const error = new Error("Something went wrong!!")
error.message = "New Error"
