import cv2
import mediapipe as mp
import pickle
import numpy as np

# Load the trained model
model_dict = pickle.load(open('./model.p', 'rb'))
model = model_dict['model']

# Initialize video capture
cap = cv2.VideoCapture(0)

# Initialize Mediapipe Hands
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

# Update the labels dictionary to match the label mapping used during training
labels_dict = {0: "Hello", 1: "There", 2: "Home"}

while True:
    ret, frame = cap.read()

    if not ret:
        break

    H, W, _ = frame.shape
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    result = hands.process(frame_rgb)
    if result.multi_hand_landmarks:
        for hand_landmarks in result.multi_hand_landmarks:
            data_aux = []
            x_ = []
            y_ = []

            for i in range(len(hand_landmarks.landmark)):
                x = hand_landmarks.landmark[i].x
                y = hand_landmarks.landmark[i].y
                data_aux.append(x)
                data_aux.append(y)
                x_.append(x)
                y_.append(y)

            # Make predictions for each hand detected
            if len(data_aux) == 42:  # Ensure each data vector has 42 elements
                prediction = model.predict([np.asarray(data_aux)])
                predicted_character = labels_dict[int(prediction[0])]
                print(predicted_character)

                # Put text label on the frame
                x1 = int(min(x_) * W) - 10
                y1 = int(min(y_) * H) - 10

                # Determine hand side and show label accordingly
                if hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].x < hand_landmarks.landmark[
                    mp_hands.HandLandmark.THUMB_TIP].x:
                    cv2.putText(frame, f"Right: {predicted_character}", (x1, y1 - 10), cv2.FONT_HERSHEY_COMPLEX, 1.3,
                                (0, 250, 0), 4, cv2.LINE_AA)
                else:
                    cv2.putText(frame, f"Left: {predicted_character}", (x1, y1 - 10), cv2.FONT_HERSHEY_COMPLEX, 1.3,
                                (0, 250, 0), 4, cv2.LINE_AA)

            # Draw landmarks
            mp_drawing.draw_landmarks(
                frame,
                hand_landmarks,
                mp_hands.HAND_CONNECTIONS,
                mp_drawing_styles.get_default_hand_landmarks_style(),
                mp_drawing_styles.get_default_hand_connections_style()
            )

            # Draw bounding box
            x1 = int(min(x_) * W) - 10
            y1 = int(min(y_) * H) - 10
            x2 = int(max(x_) * W) - 10
            y2 = int(max(y_) * H) - 10
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), thickness=4)

    # Display the resulting frame
    cv2.imshow("frame", frame)

    # Break the loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the capture and close windows
cap.release()
cv2.destroyAllWindows()
