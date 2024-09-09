from ultralytics import YOLO
import cv2
import cvzone
import math
import time

cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 720)

model = YOLO("../models/yolov8n.pt")

classNames = ["person", "real", "fake"]

prev_frame_time = 0
new_frame_time = 0

while True:
    new_frame_time = time.time()
    success, img = cap.read()
    results = model(img, stream=True)
    for r in results:
        boxes = r.boxes
        for box in boxes:
            # Bounding the box
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

            w, h = x2 - x1, y2 - y1
            cvzone.cornerRect(img, (x1, y1, w, h))

            conf = math.ceil((box.conf[0] * 100)) / 100

            cls = int(box.cls[0])

            # Check if class index is within the range of classNames
            if cls < len(classNames):
                cvzone.putTextRect(img, f'{classNames[cls]} {conf}', (max(0, x1), max(35, y1)), scale=2, thickness=4)
            else:
                cvzone.putTextRect(img, f'Unknown {conf}', (max(0, x1), max(35, y1)), scale=2, thickness=4)

        fps = 1 / (new_frame_time - prev_frame_time)
        prev_frame_time = new_frame_time
        print(fps)

        cv2.imshow("image", img)
        cv2.waitKey(1)
