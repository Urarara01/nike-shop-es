import { CustomerReviews, Footer, Hero, PopularProducts, Services, SpecialOffer, Subscribe, SuperQuality } from "./sections";
import Nav from "./components/Nav";
import ChatButton from "./components/ChatButton";

const Home = () => {
  return (
    <main className="relative bg-gradient-to-br from-white via-pale-blue to-primary">
      <Nav />
      <ChatButton />
      <section className="xl:padding-l wide:padding-r padding-b relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 via-transparent to-neon-pink/5 pointer-events-none"></div>
        <Hero />
      </section>
      <section className="padding relative">
        <PopularProducts />
      </section>
      <section className="padding relative bg-gradient-to-r from-pale-blue via-white to-pale-blue">
        <SuperQuality />
      </section>
      <section className="padding-x py-10 relative">
        <Services />
      </section>
      <section className="padding relative bg-gradient-to-br from-white via-pale-blue to-primary">
        <SpecialOffer />
      </section>
      <section className="bg-gradient-to-br from-pale-blue to-white padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-glow/5 via-transparent to-neon-pink/5 pointer-events-none"></div>
        <CustomerReviews />
      </section>
      <section className="padding-x sm:py-32 py-16 w-full relative bg-gradient-to-r from-white via-pale-blue to-white">
        <Subscribe />
      </section>
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 padding-x padding-t pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-coral-red/10 via-transparent to-electric-blue/10 pointer-events-none"></div>
        <Footer />
      </section>
    </main>
    );
};

export default Home;
