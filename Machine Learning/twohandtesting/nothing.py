import cv2
import mediapipe as mp
import pyautogui
import time
import os

# Create the images folder if it doesn't exist
if not os.path.exists("./images"):
    os.makedirs("./images")

# Function to take screenshot
def take_screenshot(filename=None):
    if filename is None:
        filename = f"screenshot_{take_screenshot.counter}.png"
    else:
        filename = f"{filename}.png"
    screenshot = pyautogui.screenshot()
    screenshot.save(os.path.join("images", filename))
    print("-----------------------------------------------Screenshot done !-----------------------------------")
    take_screenshot.counter += 1

take_screenshot.counter = 0

# Initialize mediapipe
mp_hands = mp.solutions.hands
hands = mp_hands.Hands()

# Open Webcam
cap = cv2.VideoCapture(0)

# Variables to track hand movement
prev_y = None
direction = None
cooldown_start_time = time.time()

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        print("Can't receive frame (stream end?). Exiting ...")
        break

    # Convert the image to RGB
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Detect hands in the frame
    results = hands.process(frame_rgb)

    # Check if hands are detected
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            # Get the y-coordinate of the hand
            y = hand_landmarks.landmark[0].y * frame.shape[0]  # Hand landmark 0 is the wrist

            # Determine hand movement direction
            if prev_y is not None:
                if y > prev_y:
                    direction = "down"
                else:
                    direction = "up"

            prev_y = y

            # If hand movement is from up to down and cooldown time has passed, take a screenshot
            if direction == "down" and time.time() - cooldown_start_time > 0.5:
                take_screenshot()
                print("Screenshot taken!")
                cooldown_start_time = time.time()

    # Display the frame
    cv2.imshow('Frame', frame)

    # Exit when 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()
