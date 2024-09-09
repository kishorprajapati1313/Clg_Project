import mediapipe as mp
import cv2
import os
import pickle

# Initialize Mediapipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

DATA_DIR = './data'

data = []
labels = []

for dir_ in os.listdir(DATA_DIR):
    for img_path in os.listdir(os.path.join(DATA_DIR, dir_)):
        img = cv2.imread(os.path.join(DATA_DIR, dir_, img_path))
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Process the image to detect hands
        result = hands.process(img_rgb)

        # Initialize data list for this image
        img_data = []

        if result.multi_hand_landmarks:
            for hand_landmarks in result.multi_hand_landmarks:
                data_aux = []

                # Append landmarks to data_aux
                for i in range(len(hand_landmarks.landmark)):
                    x = hand_landmarks.landmark[i].x
                    y = hand_landmarks.landmark[i].y
                    data_aux.append(x)
                    data_aux.append(y)

                # Add data_aux to img_data
                img_data.append(data_aux)

            # Ensure each data vector has 42 elements
            img_data = [data_aux for data_aux in img_data if len(data_aux) == 42]

        # Append img_data and labels to data and labels lists
        data.extend(img_data)
        labels.extend([dir_] * len(img_data))

# Save data and labels using pickle
with open('data.pickle', 'wb') as f:
    pickle.dump({'data': data, 'labels': labels}, f)

# Verify the saved data
with open('data.pickle', 'rb') as f:
    saved_data = pickle.load(f)

print(f"Total data samples: {len(saved_data['data'])}")
print(f"Total labels: {len(saved_data['labels'])}")
