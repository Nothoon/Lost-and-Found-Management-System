import tkinter as tk
import time as t
import math.py

import json
import mailbox
import turtle 


def on_button_click():
    """Function to be called when the button is clicked."""
    print("Button was clicked!")
    # Update the label text
    label.config(text="Button Clicked!")

# 1. Create the main application window
window = tk.Tk()
x  = 2
canyouseethisVAR = 1
class item: 
    def __init__(name,date,color):
        self.name = name
        self.date = date
        self.color = color
        isFound = False
    
    def collectItem(self):
        isFound = True
        print("You have collected the item: " + self.name)

    def itemIsFound(self):
        if(self.isFound == True):
            print("You have found the item: " + self.name)
        else:
            print("You have not found the item: " + self.name)



window.title("My First GUI")
window.geometry("300x200") # Set the initial size of the window (width x height)

# 2. Add a Label widget
label = tk.Label(window, text="Hello, Tkinter!", font=("Helvetica", 16))
# Arrange the label within the window using the pack() geometry manager
label.pack(pady=20) # Add vertical padding for better layout

# 3. Add a Button widget
button = tk.Button(window, text="Click Me", command=on_button_click)
# Arrange the button within the window
button.pack(pady=10)

# 4. Start the GUI event loop
# This makes the window wait for any user interaction until it is closed
window.mainloop()
