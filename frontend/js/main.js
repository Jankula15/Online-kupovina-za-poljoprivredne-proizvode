let korpaIndikator;
let korpaDropdown;
let loginButton;
let registerButton;
let authButton;

const Proizvodi = {
  kukuruz1: {
    slika: "Images/Kukuruz/NS205.jpg",
    ime: "NS3021",
    cenaPoKg: 3850
  },

  kukuruz2: {
    slika: "Images/Kukuruz/NS223.jpg",
    ime: "NS3022",
    cenaPoKg: 3850
  },

  kukuruz3: {
    slika: "Images/Kukuruz/NS3022q.jpeg",
    ime: "NS3023",
    cenaPoKg: 3850
  },

  kukuruz4: {
    slika: "Images/Kukuruz/NS609b.jpg",
    ime: "NS3024",
    cenaPoKg: 3850
  },

  kukuruz5: {
    slika: "Images/Kukuruz/ns4015.jpg",
    ime: "NS3025",
    cenaPoKg: 3850
  },

  kukuruz6: {
    slika: "Images/Kukuruz/ns6043.jpg",
    ime: "NS3026",
    cenaPoKg: 3850
  },
  suncokret1: {
    slika: "Images/UljaneKulture/labud.jpg",
    ime: "LABUD",
    cenaPoKg: 9900
  },
  suncokret2: {
    slika: "Images/UljaneKulture/dusko.jpg",
    ime: "DUSKO",
    cenaPoKg: 9900
  },
  suncokret3: {
    slika: "Images/UljaneKulture/nsgricko2.jpg",
    ime: "NSRONIN",
    cenaPoKg: 9900
  },
  suncokret4: {
    slika: "Images/UljaneKulture/nskruna.jpg",
    ime: "NSKRUNA",
    cenaPoKg: 9900
  },
  suncokret5: {
    slika: "Images/UljaneKulture/nsoskar.jpg",
    ime: "NSOSKAR",
    cenaPoKg: 9900
  },
  suncokret6: {
    slika: "Images/UljaneKulture/pegaz.jpg",
    ime: "PEGAZ",
    cenaPoKg: 9900
  },
  soja1: {
    slika: "Images/Soja/nsmaximus.jpg",
    ime: "MAKSIMUS",
    cenaPoKg: 99
  },
  soja2: {
    slika: "Images/Soja/galina.jpg",
    ime: "GALINA",
    cenaPoKg: 99
  },
  soja3: {
    slika: "Images/Soja/kaca.jpg",
    ime: "KACA",
    cenaPoKg: 99
  },
  soja4: {
    slika: "Images/Soja/nsapolo.jpg",
    ime: "APOLO",
    cenaPoKg: 99
  },
  soja5: {
    slika: "Images/Soja/rubin.jpg",
    ime: "RUBIN",
    cenaPoKg: 99
  },
  soja6: {
    slika: "Images/Soja/valjevka.jpg",
    ime: "VALJEVKA",
    cenaPoKg: 99
  },
  krmnobilje1: {
    slika: "Images/KrmnoBilje/novibeograd.jpg",
    ime: "NOVIBEOGRAD",
    cenaPoKg: 480
  },
  krmnobilje2: {
    slika: "Images/KrmnoBilje/neoplanta.jpg",
    ime: "NEOPLANTA",
    cenaPoKg: 480
  },
  krmnobilje3: {
    slika: "Images/KrmnoBilje/kosmaj.jpg",
    ime: "KOSMAJ",
    cenaPoKg: 480
  },
  strnazita1: {
    slika: "Images/StrnaZita/nirvana1-t.jpg",
    ime: "NIRVANA",
    cenaPoKg: 50
  },
  strnazita2: {
    slika: "Images/StrnaZita/odisej1-t.jpg",
    ime: "ODISEJA",
    cenaPoKg: 50
  },
  strnazita3: {
    slika: "Images/StrnaZita/ns40s2-t.jpg",
    ime: "NS40S",
    cenaPoKg: 50
  },
  strnazita4: {
    slika: "Images/StrnaZita/nsdika2-t.jpg",
    ime: "NSDIKA",
    cenaPoKg: 50
  },
  strnazita5: {
    slika: "Images/StrnaZita/nsmarko2.jpg",
    ime: "NSMARKO",
    cenaPoKg: 50
  },
  strnazita6: {
    slika: "Images/StrnaZita/nssedef2.jpg",
    ime: "NSSEDEF",
    cenaPoKg: 50
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Add listeners to login and register buttons
  loginButton = document.querySelector(".login-button");
  registerButton = document.querySelector(".register-button");

  if (loginButton) {
    loginButton.addEventListener("click", login);
  }

  if (registerButton) {
    registerButton.addEventListener("click", register);
  }

  // Fetch auth button on navbar
  authButton = document.querySelector(".auth-button");
  proveriKorisnika();

  korpaIndikator = document.querySelector(".korpa-indikator");
  korpaDropdown = document.querySelector(".korpa-dropdown");

  popuniKorpu();
});

function proveriKorisnika() {
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));

    authButton.innerHTML = `Dobrodoshli, ${user.name}!`;
    authButton.setAttribute("href", "#");
    authButton.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.reload();
    });
  }
}

function popuniKorpu() {
  let kupiDugme = document.createElement("button");
  kupiDugme.classList.add("btn");
  kupiDugme.classList.add("btn-block");
  kupiDugme.classList.add("btn-primary");
  kupiDugme.classList.add("dugme-kupi");
  kupiDugme.innerHTML = "KUPI";

  kupiDugme.addEventListener("click", () => {
    alert("Uspesno ste izvrsili kupovinu.Hvala!");
    localStorage.removeItem("korpa");
    localStorage.removeItem("ukupnaCena");
    window.location.reload();
  });

  let korpaDropdownContainer = document.createElement("div");
  korpaDropdownContainer.classList.add("korpa-item-container");

  while (korpaDropdown.firstChild) {
    korpaDropdown.removeChild(korpaDropdown.firstChild);
  }

  if (localStorage.getItem("korpa")) {
    let korpa = JSON.parse(localStorage.getItem("korpa"));
    let ukupnaCena = 0;

    korpa.forEach((element, index) => {
      const ime = element.ime;
      ukupnaCena += element.cenaPoKg;
      let korpaDropdownItem = document.createElement("div");
      let brisiDugme = document.createElement("span");
      brisiDugme.className = "delete-btn";
      brisiDugme.innerHTML = "X";

      brisiDugme.addEventListener("click", () => brisielement(ime));

      korpaDropdownItem.className = "dropdown-item";
      korpaDropdownItem.innerHTML = `
       <img src='${
         element.slika
       }'  style='border-radius: 50%; width: 50px;' />     
      ${element.ime}
      <input class="cart-quantity-input" id="kolicina-input-${index +
        1}" onchange="pomnoziCenu(this, ${index})" type="number" min="1" value="1"><span> - ${
        element.cenaPoKg
      } RSD</span>`;

      korpaDropdownItem.appendChild(brisiDugme);
      korpaDropdownContainer.appendChild(korpaDropdownItem);
      korpaDropdownItem = null;
    });

    korpaDropdown.appendChild(korpaDropdownContainer);
    korpaDropdown.appendChild(kupiDugme);

    korpaIndikator.innerHTML = `${korpa.length} stavke - ${ukupnaCena} RSD`;
    localStorage.setItem("ukupnaCena", ukupnaCena.toString());
  }
}

function DodajProizvod(id) {
  const Proizvod = Proizvodi[id];

  if (localStorage.getItem("korpa")) {
    let storage = JSON.parse(localStorage.getItem("korpa"));
    storage.push(Proizvod);

    localStorage.setItem("korpa", JSON.stringify(storage));
  } else {
    let storage = [];
    storage.push(Proizvod);

    localStorage.setItem("korpa", JSON.stringify(storage));
  }

  popuniKorpu();
}

function brisielement(id) {
  if (localStorage.getItem("korpa")) {
    let korpa = JSON.parse(localStorage.getItem("korpa"));

    korpa.forEach((element, i) => {
      if (element.ime === id) {
        korpa.splice(i, 1);
      }
    });

    localStorage.setItem("korpa", JSON.stringify(korpa));
    popuniKorpu();
  }
}

function pomnoziCenu(e, index) {
  let korpa = JSON.parse(localStorage.getItem("korpa"));

  korpa.forEach((element, i) => {
    if (i === index) {
      const kolicina = e.value;
      const prethodnaCena = Number.parseInt(localStorage.getItem("ukupnaCena"));
      const acc = kolicina * element.cenaPoKg;
      const prethodnaCenaElementa = Number.parseInt(
        e.nextSibling.innerText.split(" ")[1]
      );

      if (prethodnaCenaElementa > acc) {
        localStorage.setItem("ukupnaCena", (prethodnaCena - acc).toString());
      } else {
        localStorage.setItem(
          "ukupnaCena",
          (prethodnaCena + element.cenaPoKg).toString()
        );
      }

      e.nextSibling.innerText = `- ${acc} RSD`;

      korpaIndikator.innerHTML = `${
        korpa.length
      } stavke - ${localStorage.getItem("ukupnaCena")} RSD`;
    }
  });
}

// Register
function register(e) {
  e.preventDefault();

  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const name = document.querySelector("#name");
  const password2 = document.querySelector("#password2");

  axios
    .post("http://localhost:5000/users/register", {
      email: email.value,
      name: name.value,
      password: password.value,
      password2: password2.value
    })
    .then(res => {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/";
    })
    .catch(() => {
      alert("Neispravni podaci! Pokusajte ponovo!");
    });
}

// Login
function login(e) {
  e.preventDefault();

  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  axios
    .post("http://localhost:5000/users/login", {
      email: email.value,
      password: password.value
    })
    .then(res => {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/";
    })
    .catch(() => {
      alert("Neispravni podaci! Pokusajte ponovo!");
    });
}
