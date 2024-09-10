import cv2
import mediapipe as mp
import pickle

import numpy as np

######################################################################################################
model_dict = pickle.load(open('./model.p', 'rb'))
model = model_dict['model']
cap = cv2.VideoCapture(0)

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

labels_dict = {0:"Hello", 1:"Yes", 2:"Yoimo", 3:"Yummy"}
#######################################################################################################
while True:
    data_aux = []
    x_ = []
    y_ = []
    ret, frame = cap.read()

    H, W, _ = frame.shape
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    result = hands.process(frame_rgb)
    if result.multi_hand_landmarks:
        for hand_landmarks in result.multi_hand_landmarks:
            mp_drawing.draw_landmarks(
                frame,       # image Draw
                hand_landmarks, # model Output
                mp_hands.HAND_CONNECTIONS,
                mp_drawing_styles.get_default_hand_landmarks_style(),
                mp_drawing_styles.get_default_hand_connections_style())

        for hand_landmarks in result.multi_hand_landmarks:
            for i in range(len(hand_landmarks.landmark)):
                x = hand_landmarks.landmark[i].x
                y = hand_landmarks.landmark[i].y
                data_aux.append(x)
                data_aux.append(y)                                # problem when it goes minus
                x_.append(x)
                y_.append(y)

        x1 = int(min(x_) * W) - 10
        y1 = int(min(y_) * H) - 10

        x2 = int(max(x_) * W) - 10
        y2 = int(max(y_) * H) - 10

        prediction = model.predict([np.asarray(data_aux)])

        predected_character = labels_dict[int(prediction[0])]

        print(predected_character)

        cv2.rectangle(frame, (x1, y1), (x2,y2), (0, 0, 0), thickness=4)
        cv2.putText(frame, predected_character,(x1, y1 - 10), cv2.FONT_HERSHEY_COMPLEX,1.3,(0, 250, 0), 4, cv2.LINE_AA )

    cv2.imshow("frame", frame)

    cv2.waitKey(1)

cap.release()
cv2.destroyAllWindows()