import os
import urllib.request
import urllib.error
import time

BASE_URL = "http://www.rleonardi.com/interactive-resume/"

images = [
    "algae-a.png", "algae-b.png", "alien-body.png", "alien-ship.png", "alien-steer.png",
    "balloon.png", "banner-bottom-a.png", "banner-bottom-b.png", "banner-top-a.png",
    "banner-top-b.png", "box.png", "bubble.png", "building-a.png", "building-b.png",
    "building-c.png", "enemy-face-a.png", "enemy-face-a-eyes.png", "enemy-face-b.png",
    "enemy-face-b-eyes.png", "building-a-leg-frame.png", "building-b-leg-frame.png",
    "chain-block.png", "chain-block-string.png", "coral-a.png", "coral-b.png",
    "coral-big-a.png", "coral-big-b.png", "contact-box.png", "contact-box-hole-a.png",
    "contact-box-hole-b.png", "contact-button.png", "contact-cloud-bottom.png",
    "contact-cloud-top.png", "contact-confirmation-triangle.png", "cloud.png",
    "crab.png", "crab-eyes.png", "crane.png", "dock-floor.png", "dock-column.png",
    "floor.png", "enemy-face-frame-a.png", "enemy-face-frame-b.png", "email-button.png",
    "fence.png", "fish.png", "fish-eyes.png", "foundation.png", "gate.png", "grass.png",
    "ground.png", "javascript-banner-left.png", "javascript-banner-right.png",
    "mountain.png", "nba-ball.png", "nba-board-blue.png", "nba-board-red.png",
    "nba-player.png", "nba-rim.png", "hangar-window.png", "panel.png",
    "piechart-front.png", "piechart-back.png", "plant-head-leaves.png",
    "plant-ribbon-left.png", "plant-ribbon-right.png", "preloader-banner-left.png",
    "preloader-banner-right.png", "preloader-dots-animation.gif", "preloader-dots-static.png",
    "robby-eyes-close.png", "robby-slides.png", "ribbon-left.png", "ribbon-right.png",
    "robot-body.png", "robot-hand-a.png", "robot-hand-b.png", "robot-hand-c.png",
    "robot-hand-d.png", "sea-ribbon-left.png", "sea-ribbon-right.png", "sea-wave.png",
    "social-bottom.png", "social-top.png", "social-facebook.png", "social-twitter.png",
    "social-dribbble.png", "social-print.png", "squid-body.png", "squid-hand-close-a.png",
    "squid-hand-close-b.png", "squid-hand-close-c.png", "squid-hand-close-d.png",
    "squid-hand-open-a.png", "squid-hand-open-b.png", "squid-hand-open-c.png",
    "squid-hand-open-d.png", "title-about.png", "title-awards-and.png",
    "title-contact.png", "title-experience.png", "title-leonardi.png",
    "title-publication.png", "title-robby.png", "title-skills.png",
    "tree-bright-a.png", "tree-bright-b.png", "tree-bright-c.png", "tree-bright-d.png",
    "tree-bright-e.png", "tree-dark-a.png", "tree-dark-b.png", "tree-dark-c.png",
    "tree-dark-d.png", "tree-dark-e.png", "turtle.png", "turtle-eyes.png",
    "waterfall-a.png", "waterfall-b.png", "window.png", "banner-button.png"
]

fonts = []
font_names = ["frankfurter-medium-plain", "frankfurter-plain", "lobster-1.4", "poster-sans-bold"]
extensions = ["eot", "woff", "ttf", "svg"]

for f_name in font_names:
    for ext in extensions:
        fonts.append(f"{f_name}.{ext}")

scripts = [
    "jquery-3.3.1.min.js",
    "jquery-ui.min.js"
]

def download_file(url, local_path):
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    if os.path.exists(local_path):
        print(f"Skipping (already exists): {local_path}")
        return True
    
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    req = urllib.request.Request(url, headers=headers)
    
    print(f"Downloading {url} -> {local_path}")
    try:
        with urllib.request.urlopen(req) as response:
            with open(local_path, "wb") as f:
                f.write(response.read())
        time.sleep(0.05) # small politeness delay
        return True
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code} for URL: {url}")
        return False
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

print("Starting asset download...")

# 1. Download images
success_imgs = 0
for img in images:
    url = f"{BASE_URL}image/{img}"
    path = f"image/{img}"
    if download_file(url, path):
        success_imgs += 1

# 2. Download fonts
success_fonts = 0
for font in fonts:
    url = f"{BASE_URL}font/{font}"
    path = f"font/{font}"
    if download_file(url, path):
        success_fonts += 1

# 3. Download scripts
success_scripts = 0
for script in scripts:
    url = f"{BASE_URL}script/{script}"
    path = f"script/{script}"
    if download_file(url, path):
        success_scripts += 1

print(f"\nDownload finished.")
print(f"Images: {success_imgs}/{len(images)} downloaded successfully.")
print(f"Fonts: {success_fonts}/{len(fonts)} downloaded successfully.")
print(f"Scripts: {success_scripts}/{len(scripts)} downloaded successfully.")
