import React from 'react'

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Biowell</h1>
          <p className="text-xl text-gray-600">
            Your trusted partner in personalized wellness
          </p>
        </div>

        <div className="prose prose-lg mx-auto">
          <p>
            Biowell is a cutting-edge digital wellness platform that combines the latest 
            scientific research with personalized health insights to help you optimize 
            your well-being through targeted supplementation.
          </p>

          <h2>Our Mission</h2>
          <p>
            We believe that everyone deserves access to personalized health guidance. 
            Our mission is to democratize wellness by making science-backed supplement 
            recommendations accessible to everyone, regardless of their background or 
            health knowledge.
          </p>

          <h2>How It Works</h2>
          <p>
            Our AI-powered platform analyzes your health profile, lifestyle factors, 
            and wellness goals to create customized supplement recommendations. We 
            continuously update our recommendations based on the latest research and 
            your progress.
          </p>

          <h2>Science-First Approach</h2>
          <p>
            Every recommendation is backed by peer-reviewed research and clinical studies. 
            We work with leading researchers and healthcare professionals to ensure our 
            guidance is both safe and effective.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage