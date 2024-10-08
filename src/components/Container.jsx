import LogoHeader from "./molecules/LogoHeader";

const Container = ({ children }) => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <LogoHeader/>
        {children}
      </div>
    </section>
  );
};

export default Container;
