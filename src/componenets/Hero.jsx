import React from 'react'

const Hero = () => {
  return (
    <div className="bg-[#101828] min-h-screen text-white font-mono p-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2 tracking-wide font-times" style={{ fontFamily: 'Times New Roman, serif' }}>Ankit Gupta</h1>
        <div className="space-x-4 text-red-500 text-sm m-7 ">
          <a href="https://github.com/ankitXD" target='_blank' className='hover:underline underline-offset-4 decoration-blue-500'>github</a>
          <a href="https://www.linkedin.com/in/ankit-gupta-s3v3nc3/" target='_blank' className='hover:underline underline-offset-4 decoration-blue-500'>linkedin</a>
          <a href="mailto:guptankit.2003@gmail.com" target='_blank' className='hover:underline underline-offset-4 decoration-blue-500'>mail</a>
        </div>
      </header>

      <section className="mt-10 max-w-3xl mx-auto space-y-10">
        <div>
          <h2 className="text-lg font-bold">About</h2>
          <p className="mt-2 text-justify leading-relaxed tracking-wide">
            Hi, I am Ankit Gupta, a passionate developer with a keen interest in building impactful web applications. I enjoy solving complex problems and continuously learning new technologies. My goal is to create solutions that make a difference and help others.
          </p>
        </div>

        <div>
          <p className="font-bold">14 May 2025</p>
          <a href="https://nourish-the-nation.vercel.app/" target='_blank' className="text-red-600 hover:underline underline-offset-4 decoration-blue-500">Nourish The Nation</a>
          <p className="mt-1 text-justify leading-relaxed tracking-wide">A platform dedicated to addressing food insecurity by connecting donors with those in need. Built with modern web technologies to ensure accessibility and ease of use.</p>
        </div>

        <div>
          <p className="font-bold">09 June 2025</p>
          <a href="/" className="text-red-600 hover:underline underline-offset-4 decoration-blue-500">Portfolio V1</a>
          <p className="mt-1 text-justify leading-relaxed tracking-wide">My personal portfolio showcasing my projects, skills, and journey as a developer. Designed to reflect my passion for clean code and user-centric design.</p>
        </div>
      </section>
    </div>
  )
}

export default Hero
