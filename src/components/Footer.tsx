const Footer = () => {
  return (
    <footer className="relative py-16 px-6 border-t border-border/30">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="font-display text-xl font-bold text-gradient mb-2">
          SMARTLEARN
        </h3>
        <p className="text-muted-foreground text-sm mb-6">
          100% Free Coding Academy — A Next-Generation AI Learning Platform
        </p>
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground mb-8">
          <span className="hover:text-primary transition-colors cursor-pointer">Courses</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Dashboard</span>
          <span className="hover:text-primary transition-colors cursor-pointer">About</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Contact</span>
        </div>
        <div className="glass rounded-xl inline-block px-6 py-3 mb-4">
          <p className="text-xs text-muted-foreground">
            <span className="text-primary font-semibold">Nandha Engineering College</span>
          </p>
        </div>
        <p className="text-xs text-muted-foreground/50 mt-4">
          © 2026 SmartLearn. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
