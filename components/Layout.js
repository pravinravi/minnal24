import Header from './Header';
import Footer from './Footer';
import BreakingNewsTicker from './BreakingNewsTicker';
import ScrollToTop from './ScrollToTop';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <BreakingNewsTicker />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
