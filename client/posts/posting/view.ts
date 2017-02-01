import PostView from "../view"
import FormModel from "./model"
import { Post } from "../model"
import { boardConfig } from "../../state"
import { setAttrs, write, importTemplate, atBottom, scrollToBottom } from "../../util"
import { renderHeader, renderName } from "../render"
import { postSM, postEvent } from "."
import UploadForm from "./upload"
import identity from "./identity"

// Element at the bottom of the thread to keep the fixed reply form from
// overlapping any other posts, when scrolled till bottom
let bottomSpacer: HTMLElement

// Post creation and update view
export default class FormView extends PostView {
    public model: FormModel
    private input: HTMLTextAreaElement
    private done: HTMLElement
    public cancel: HTMLElement
    private observer: MutationObserver
    private postControls: Element
    private previousHeight: number
    public upload: UploadForm

    constructor(model: Post, isOP: boolean) {
        super(model, null)
        this.renderInputs(isOP)
        if (!isOP) {
            this.el.classList.add("reply-form")
            this.initDraft()
        }
    }

    // Render extra input fields for inputting text and optionally uploading
    // images
    private renderInputs(isOP: boolean) {
        this.input = document.createElement("textarea")
        setAttrs(this.input, {
            id: "text-input",
            name: "body",
        })
        this.resizeInput()

        this.input.addEventListener("input", (event: Event) => {
            event.stopImmediatePropagation()
            this.onInput()
        })

        this.postControls = importTemplate("post-controls").firstElementChild
        this.el.querySelector(".post-container").append(this.postControls)

        this.done = this.el.querySelector("input[name=done]")
        this.done.addEventListener("click", postSM.feeder(postEvent.done))
        this.cancel = this.el.querySelector("input[name=cancel]")
        this.cancel.addEventListener("click", postSM.feeder(postEvent.done))

        if (isOP) {
            this.showDone()
        } else {
            if (!boardConfig.textOnly) {
                this.upload = new UploadForm(this.model, this.el)
                this.upload.input.addEventListener("change", () =>
                    this.model.uploadFile())
            }
            this.renderIdentity()
        }

        write(() => {
            const bq = this.el.querySelector("blockquote")
            bq.innerHTML = ""
            bq.append(this.input)
            this.input.focus()
        })
    }

    // Render a temporary view of the identity fields, so the user can see what
    // credentials he is about to post with
    public renderIdentity() {
        let {name, auth} = identity,
            trip = ""
        const i = name.indexOf("#")
        if (i !== -1) {
            trip = "?"
            name = name.slice(0, i)
        }

        const el = this.el.querySelector(".name")
        el.classList.remove("admin")
        renderName(el, {
            trip,
            auth: auth ? "??" : "",
            name: name.trim(),
        })
    }

    // Show button for closing allocated posts
    private showDone() {
        this.cancel.hidden = true
        this.done.hidden = false
    }

    // Initialize extra elements for a draft unallocated post
    private initDraft() {
        this.el.querySelector("header").classList.add("temporary")
        bottomSpacer = document.getElementById("bottom-spacer")

        // Keep this post and bottomSpacer the same height
        this.observer = new MutationObserver(() =>
            write(() =>
                this.resizeSpacer()))
        this.observer.observe(this.el, {
            childList: true,
            attributes: true,
            characterData: true,
            subtree: true,
        })

        write(() => {
            document.getElementById("thread-container").append(this.el)
            this.input.focus()
            this.resizeSpacer()
        })
    }

    // Resize bottomSpacer to the same top position as this post
    private resizeSpacer() {
        // Not a reply
        if (!bottomSpacer) {
            return
        }

        const {height} = this.el.getBoundingClientRect()
        // Avoid needless writes
        if (this.previousHeight === height) {
            return
        }
        this.previousHeight = height
        bottomSpacer.style.height = `calc(${height}px - 2.1em)`
    }

    private removeUploadForm() {
        write(() => {
            this.upload.input.remove()
            this.upload.status.remove()
        })
    }

    // Handle input events on this.input
    private onInput() {
        this.resizeInput()
        this.model.parseInput(this.input.value)
    }

    private resizeInput() {
        const el = this.input,
            s = el.style
        s.height = "auto"
        s.height = el.scrollHeight + "px"
    }

    // Trim input from the end by the supplied length
    public trimInput(length: number) {
        this.input.value = this.input.value.slice(0, -length)
    }

    // Replace the current body and set the cursor to the input's end
    public replaceText(body: string) {
        write(() => {
            const el = this.input
            el.value = body
            this.el.focus()
            el.setSelectionRange(body.length, body.length)
            this.onInput()
        })
    }

    // Transform form into a generic post. Removes any dangling form controls
    // and frees up references.
    public cleanUp() {
        this.el.classList.remove("reply-form")
        if (this.postControls) {
            this.postControls.remove()
        }
        if (bottomSpacer) {
            bottomSpacer.style.height = ""
            if (atBottom) {
                scrollToBottom()
            }
        }
        if (this.observer) {
            this.observer.disconnect()
        }
        this.postControls
            = bottomSpacer
            = this.observer
            = this.done
            = this.cancel
            = this.input
            = this.upload
            = null
    }

    // Clean up on form removal
    public remove() {
        super.remove()
        this.cleanUp()
    }

    // Lock the post form after a critical error occurs
    public renderError() {
        write(() =>
            (this.el.classList.add("errored"),
                this.input.setAttribute("contenteditable", "false")))
    }

    // Transition into allocated post
    public renderAlloc() {
        this.id = "p" + this.model.id
        const header = this.el.querySelector("header")
        write(() => {
            this.el.id = this.id as string
            header.classList.remove("temporary")
            renderHeader(header, this.model)
            this.showDone()
        })
    }

    // Toggle the spoiler input checkbox
    public toggleSpoiler() {
        // Can only turn a spoiler on, if image already allocated
        if (this.model.image && this.model.image.spoiler) {
            return
        }

        write(() => {
            const el = this.el
                .querySelector("input[name=spoiler]") as HTMLInputElement
            el.checked = !el.checked
        })
    }

    // Insert image into the open post
    public insertImage() {
        this.renderImage(false, true)
        this.removeUploadForm()

        const {spoiler} = this.upload
        if (this.model.image.spoiler) {
            write(() =>
                spoiler.remove())
        } else {
            const fn = () =>
                this.upload.spoilerImage()
            spoiler.addEventListener("change", fn, {
                passive: true,
            })
        }
    }
}
