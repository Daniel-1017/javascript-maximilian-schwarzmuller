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
  constructor(closeNotifierFunction) {
    super()
    this.closeNotifier = closeNotifierFunction
    this.create()
  }

  closeTooltip = () => {
    this.detach()
    this.closeNotifier()
  }

  create() {
    const tooltipEl = document.createElement("div")
    tooltipEl.className = "card"
    tooltipEl.textContent = "Dummy"
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
    const tooltip = new Tooltip(() => (this.hasActiveTooltip = false))
    tooltip.attach()
    this.hasActiveTooltip = true
  }

  connectMoreInfoButton() {
    const prjItemEl = document.getElementById(this.id)
    const moreInfoBtn = prjItemEl.querySelector("button:first-of-type")
    moreInfoBtn.addEventListener("click", this.showMoreInfoHandler)
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
  }
}

App.init()
