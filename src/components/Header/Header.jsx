function Header() {
    return (
      <header className="header">
        <div className="header__left">DND Multiverse</div>
        <div className="header__center">
          <div className="logs">Logs</div>
          <div className="auth">
            <button>Sign In</button>
            <button>Sign Up</button>
          </div>
        </div>
        <div className="header__right">
          <input type="text" placeholder="Search..." />
        </div>
      </header>
    );
  }
  