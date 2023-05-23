import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  users:any
  constructor(
    private apollo: Apollo
  ) {
    this.loadUsers()
    this.init()
  }

  loadUsers() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            people {
              first_name
              last_name
              user_id
              hasFilesTypeFileTypes {
                  type
                  filesDocumentType {
                      original_filename
                      unique_filename
                  }
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.users = result.data?.people;
        console.log("this.users",this.users)
      });
  }



  










  












  
  init() {
    this.datetime();
    this.sideNav();
    this.searchBar();
    this.configureNavigation();
    this.configureHyperlinks();
    setInterval(() => {
      this.datetime();
    }, 1000);
  }

  datetime(): void {
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
  
    const dateTimeElement = document.querySelector(".welcome .datetime");
    if (dateTimeElement) {
      const dayElement = dateTimeElement.querySelector(".day");
      const dateElement = dateTimeElement.querySelector(".date");
      const timeElement = dateTimeElement.querySelector(".time");
  
      if (dayElement && dateElement && timeElement) {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const month = now.getMonth();
        const dayOfMonth = now.getDate();
        const year = now.getFullYear();
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour > 12 ? hour - 12 : hour;
        const formattedHour = hour12 === 0 ? 12 : hour12;
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  
        if (dayElement instanceof HTMLElement) {
          dayElement.textContent = daysOfWeek[dayOfWeek];
        }
        if (dateElement instanceof HTMLElement) {
          dateElement.textContent = months[month] + " " + dayOfMonth + ", " + year;
        }
        if (timeElement instanceof HTMLElement) {
          timeElement.textContent = formattedHour + ":" + formattedMinutes + ":" + formattedSeconds + " " + ampm;
        }
      }
    }
  }
  

  title(text: string) {
    return document.querySelector(".header > .title")!.textContent = text;
  }

  sideNav() {
    this.initializeEventListeners();
    this.configureNavigation();
  }

  

  initializeEventListeners() {
    const navIcon: any = document.querySelector(".ion-ios-navicon");
    const sidebar = document.querySelector(".sidebar");
    const sidebarOverlay = document.querySelector(".sidebar .sidebar-overlay");
  
    if (navIcon && sidebar && sidebarOverlay) {
      navIcon.addEventListener("click", this.toggleSidebar);
      sidebarOverlay.addEventListener("click", this.toggleSidebar);
    }
  }
  
  toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const nav = document.querySelector(".nav");
    const sidebarOverlay = document.querySelector(".sidebar .sidebar-overlay");
  
    if (sidebar && nav && sidebarOverlay) {
      sidebar.classList.toggle("active");
      nav.classList.remove("active");
  
      if (sidebar.classList.contains("active")) {
        sidebarOverlay.classList.remove("fadeOut");
        sidebarOverlay.classList.add("fadeIn");
      } else {
        sidebarOverlay.classList.remove("fadeIn");
        sidebarOverlay.classList.add("fadeOut");
      }
    }
  }
  

  screen(name:any){
    console.log('name',name)
    document.querySelectorAll('.html').forEach(element => {
      element.classList.remove('visible')
    });

    document.querySelector('.'+name)?.classList.add('visible')
    this.toggleSidebar()
  }
  

  configureNavigation() {
    const navLinks = document.querySelectorAll(".nav-left a");
    navLinks.forEach((link: Element) => {
      link.addEventListener("click", (e: Event) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href !== null) {
          const hrefWithoutHash = href.replace("#", "");
          const sidebar = document.querySelector(".sidebar");
          sidebar?.classList.toggle("active");
          const htmlElements = document.querySelectorAll(".html");
          htmlElements.forEach((element: Element) => {
            element.classList.remove("visible");
          });
          if (hrefWithoutHash === "home" || hrefWithoutHash === "" || hrefWithoutHash === null) {
            const welcomeHtml = document.querySelector(".html.welcome");
            welcomeHtml?.classList.add("visible");
          } else {
            const targetHtml = document.querySelector(`.html.${hrefWithoutHash}`);
            targetHtml?.classList.add("visible");
          }
          this.title(link.textContent || "");
        }
      });
    });
  }

  toggleMenu() {
    const nav = document.querySelector(".nav");
    nav?.classList.toggle("active");
    const navItem = document.querySelector(".nav-item");
    navItem?.classList.toggle("active");
  }
  
  searchBar() {
    const searchIcon = document.querySelector(".header .ion-ios-search");
    if (searchIcon) {
      searchIcon.addEventListener("click", () => {
        const searchInput: any = document.querySelector(".header .search input");
        const searchVisible = searchInput!.classList.contains("search-visible");
        const value: any = searchInput!.value;
        if (value !== "" && value !== null) {
          this.searchHtml(value);
          return false;
        } else {
          const nav = document.querySelector(".nav");
          nav!.classList.remove("active");
          searchInput!.focus();
          searchInput!.classList.toggle("search-visible");
          return; // Agregar declaración de retorno
        }
      });
    }
  
    const searchForm = document.querySelector(".search form");
    if (searchForm) {
      searchForm.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        this.searchHtml((document.querySelector(".header .search input") as HTMLInputElement).value);
      });
    }
  
    return; // Agregar declaración de retorno
  }
  
  

  searchHtml(value: string) {
    const searchInput = document.querySelector(".search input");
    searchInput!.classList.remove("search-visible");
    const htmlElements = document.querySelectorAll(".html");
    htmlElements.forEach((element: Element) => {
      element.classList.remove("visible");
    });
    const searchHtml = document.querySelector(".html.search");
    searchHtml!.classList.add("visible");
    this.title("Result");
    searchHtml!.innerHTML = searchHtml!.innerHTML;
    const searchKey = document.querySelector(".html.search .key");
    searchKey!.innerHTML = value;
    (<HTMLInputElement>document.querySelector(".header .search input")).value = "";
  }

  configureHyperlinks() {
    const navItems = document.querySelectorAll(".nav .nav-item");
    navItems.forEach((item: Element) => {
      item.addEventListener("click", (e: Event) => {
        e.preventDefault();
        const href = item.getAttribute("href")!.replace("#", "");
        const htmlElements = document.querySelectorAll(".html");
        htmlElements.forEach((element: Element) => {
          element.classList.remove("visible");
        });
        const targetHtml = document.querySelector(`.html.${href}`);
        targetHtml!.classList.add("visible");
        const nav = document.querySelector(".nav");
        nav!.classList.toggle("active");
        this.title(item.textContent || "");
      });
    });
  }
  

  

}
