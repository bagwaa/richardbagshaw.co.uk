import React from 'react';

const Comments = () => {
  constructor(...args) {
    super(...args)
    this.ref = React.createRef()
  }
  render() {
    return (
      <div ref={this.ref} className="comments">
        <div id="commento"></div>
      </div>
    )
  }
  componentDidMount() {
    const s = document.createElement("script")
    s.src = "https://cdn.commento.io/js/commento.js"
    s.setAttribute("data-timestamp", +new Date())
    this.ref.current.appendChild(s)
  }
}

export default Comments