import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, ShoppingCart, User, LogOut, Package } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/pizza-nova-logo.webp';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Menu', href: '#menu' },
  { name: 'Customize', href: '#customize' },
  { name: 'Combos', href: '#combos' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { totalItems, setIsCartOpen } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20 px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Pizza Nova" className="h-12 md:h-14 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted transition-colors">
              {theme === 'light' ? <Moon className="w-5 h-5 text-foreground" /> : <Sun className="w-5 h-5 text-gold" />}
            </button>

            <button onClick={() => setIsCartOpen(true)} className="p-2 rounded-full hover:bg-muted transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <User className="w-5 h-5 text-primary" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-card rounded-xl shadow-elevated border border-border overflow-hidden z-50">
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-medium truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/orders" 
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors"
                    >
                      <Package className="w-4 h-4" />
                      <span>Order History</span>
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors text-destructive"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-full hover:bg-muted transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg">
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="px-6 py-3 text-foreground/80 hover:text-primary hover:bg-muted font-medium transition-colors">
                  {link.name}
                </a>
              ))}
              {!user && (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="px-6 py-3 text-primary font-medium">
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
