export const AboutUsSection: React.FC = () => {
  return (
    <section
      className="w-full h-[400px] md:h-[600px] bg-cover bg-center relative"
      style={{ backgroundImage: 'url("/static/aboutus background.jpg")' }}
    >
      <div className="absolute w-full md:w-1/2 h-full bg-black/60 text-white flex flex-col gap-5 justify-center items-center text-left">
        <h2 className="w-4/6 text-xl md:text-6xl uppercase">about us</h2>
        <p className="w-4/6 text-md md:text-xl">
          I&apos;m a paragraph. Click here to add your own text and edit me.
          It&apos;s easy. Just click “Edit Text” or double click me to add your
          own content and make changes to the font. I&apos;m a great place for
          you to tell a story and let your users know a little more about you.
        </p>
      </div>
    </section>
  );
};
