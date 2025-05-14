# PhotoGen: A Random Photo Generator and Gallery

## Project Summary
The **Favorite** project is a web application that allows users to browse randomly selected images, choose their favorites, and view them in a gallery. The app consists of multiple pages, including an image selection page (Home), a gallery of favorited images, and a single image view page. Users can filter their favorites, change themes, and navigate seamlessly between pages. The project leverages **Flexbox for layout**, **local JSON storage**, and **API requests** to fetch images.

## Running the Project
1. Use any **local server** (or `python server.py` if included)
2. Open `index.html` in a browser

## File Structure
```
/project-folder
│── index.html      # Home Page (Image Selection)
│── gallery.html    # Gallery Page
│── image.html      # Single Image Page
│── main.js         # JavaScript for Home Page
│── gallery.js      # JavaScript for Gallery Page
│── image.js        # JavaScript for Single Image Page
│── main.css        # Styles for Home Page
│── gallery.css     # Styles for Gallery Page
│── image.css       # Styles for Single Image Page
│── favs.txt        # Stores favorited images in JSON format
│── server.py       # (Optional) Local server for saving data
```

## How It Works
### **1. Home Page (index.html)**
- **Select a category** (Wallpaper, Black and White, or Blur) to load a random image
- **View image details** (API source, URL)
- **Favorite/Unfavorite** images (saved in `favs.txt`)
- **Navigate** to Gallery via the top menu

### **2. Gallery Page (gallery.html)**
- **Displays favorited images** in a card format
- **Filter by category** to view specific images
- **Unfavorite** images (removes them from `favs.txt` and UI)
- **Click an image** to view it in detail on the Single Image Page

### **3. Single Image Page (image.html)**
- **Displays full image** with category and date added
- **Option to Unfavorite** (redirects to Gallery if removed)
- **Back button** to return to Gallery

## Styling & Themes
- **Navigation Bar** on all pages (Home & Gallery links)
- **Three themes** (color & font variations, persists across pages)
- **Cards & Layout** use Flexbox for responsiveness
- **Single images are centered** for better viewing

## Data Handling
- **Favorites stored in `favs.txt`** (JSON format)
- **Read data on page load** & **update on favorite/unfavorite actions**
