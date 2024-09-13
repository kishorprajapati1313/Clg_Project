import cv2
import os
import time
import uuid
//skjdfkb
IMAGE_PATH = "Tensorflow/workspace/images/CollectImages"

labels = ["hello", "Thanks","yes","no","iloveyou"]
number_img = 15

for label in labels:
    mkdir{"Tensorflow\workspace\images\CollectImages\\"+label}
    cap = cv2.VideoCapture(0)
    print("collecting the images".format(label))
    time.sleep(5)
    for imgnum in range(number_img):
        ret, frame = cap.read()
        imgname = os.path.join(IMAGE_PATH, label, label+'.'+'{}.jpg'.formt(str(uuid.uuid1())))
        cv2.imwrite(imgname, frame)
        cv2.imshow('fram',frame)
        time.sleep(2)

        if cv2.waitKey(0):
            break
    cap.release()
