import React from "react"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import thanksGif from "../../static/thanks.gif"

const Success = props => {
  return (
    <Layout location="/success" title="Richard Bagshaw">
      <Helmet>
        <title>Success Page</title>
        <meta name="description" content="Success Page" />
      </Helmet>

      <div className="container lg:max-w-4xl mx-auto">
        <h1 className="text-center font-os text-gray-700 text-4xl p-8">
          Thanks
        </h1>
        <img
          src={thanksGif}
          alt="Thanks so much"
          className="w-1/2 rounded-lg shadow-lg mx-auto"
        />
        <p className="text-center font-os text-gray-700 text-2xl pt-8 pb-16">
          Thanks so much for taking the time to sign upto my newsletter, it
          means the world to me that you would trust me with your email address.
        </p>
      </div>
    </Layout>
  )
}

export default Success
