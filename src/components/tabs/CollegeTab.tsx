import { motion } from "framer-motion";
import { GraduationCap, Building, Users, BookOpen, Briefcase, Image, ExternalLink } from "lucide-react";

const departments = [
  "Computer Science & Engineering",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Information Science",
];

const facilities = [
  "State-of-the-art Computer Labs",
  "Digital Library with 50,000+ Resources",
  "Innovation & Startup Incubation Hub",
  "Smart Classrooms with AI Integration",
  "Sports Complex & Gymnasium",
  "Hostel Accommodation",
];

const placements = [
  { company: "TCS", role: "Software Developer", package: "4.5 LPA" },
  { company: "Infosys", role: "Systems Engineer", package: "3.8 LPA" },
  { company: "Wipro", role: "Project Engineer", package: "3.5 LPA" },
  { company: "HCL", role: "Analyst", package: "4.0 LPA" },
];

const CollegeTab = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient mb-2">Nandha Engineering College</h2>
        <p className="text-muted-foreground text-sm max-w-2xl">
          A premier engineering institution committed to excellence in technical education since its founding.
        </p>
      </div>

      {/* History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6 glow-blue">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
            <Building className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-sm font-semibold text-foreground">Our History</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Nandha Engineering College has been a cornerstone of technical education in Karnataka. Established with a vision to produce skilled professionals, the institution has grown to become one of the most respected polytechnic colleges in the region, blending traditional academic rigor with cutting-edge technology.
        </p>
      </motion.div>

      {/* Departments & Facilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-6">
          <h3 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" /> Departments
          </h3>
          <div className="space-y-2">
            {departments.map((dept, i) => (
              <motion.div
                key={dept}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/20"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-xs text-foreground">{dept}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="glass rounded-xl p-6">
          <h3 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Building className="w-4 h-4 text-accent" /> Facilities
          </h3>
          <div className="space-y-2">
            {facilities.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/20"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                <span className="text-xs text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Placements */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-6">
        <h3 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-primary" /> Placement Highlights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {placements.map((p, i) => (
            <motion.div
              key={p.company}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="glass rounded-xl p-4 text-center"
            >
              <p className="font-display text-sm font-bold text-primary mb-1">{p.company}</p>
              <p className="text-xs text-foreground mb-0.5">{p.role}</p>
              <p className="text-[10px] text-muted-foreground">{p.package}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Gallery placeholder */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-6">
        <h3 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Image className="w-4 h-4 text-accent" /> Campus Gallery
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["Main Building", "Computer Lab", "Library", "Sports Ground"].map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.06 }}
              className="aspect-video rounded-xl bg-muted/30 flex items-center justify-center border border-border/30"
            >
              <span className="text-[10px] text-muted-foreground font-display">{label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Official Link */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center">
        <a
          href="#"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary border border-primary/20 font-display text-sm tracking-wide hover:bg-primary/20 transition-all glow-blue"
        >
          <ExternalLink className="w-4 h-4" />
          Visit Official Website
        </a>
      </motion.div>
    </div>
  );
};

export default CollegeTab;
