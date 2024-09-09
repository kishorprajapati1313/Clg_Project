import cvzone
from cvzone.FaceDetectionModule import FaceDetector
import cv2
from time import time

############################################################################
offsetPercentageW = 10
offsetPercentageH = 20
confidence = 0.5                # --------------- get the Score for detect objects --------------
save = True
blurThreshold = 35             # ---------------- Larger is more Focus --------------
outputfolderpath = 'Dataset/DataCollect'
debug = False
classID = 0                      # ------------- 0 is fake 1 is real -------------------

campWidth, campHeight = 640, 480
floatingpoint = 6

############################################################################


cap = cv2.VideoCapture(0)
cap.set(3, campWidth)
cap.set(4, campHeight)
detector = FaceDetector()

while True:
    success, img = cap.read()
    imgout = img.copy()
    img, bboxs = detector.findFaces(img, draw=False)

    listBlur = []    # True / false value if the face are blur or not
    listinfo = []    # normalize value for the class name for the label txt file
    if bboxs:

            for bbox in bboxs:
                x, y, w, h = bbox["bbox"]
                score = bbox["score"][0]
                # print(x, y, w, h)

                # -------------------------- Check the Score ----------------------
                if score > confidence:

                    # --------------- Adding Blue Box To the face detection -----------------------
                    offsetW = (offsetPercentageW / 100) * w
                    x = int(x - offsetW)
                    w = int(w + offsetW * 2)

                    offsetH = (offsetPercentageH / 100) * h
                    y = int(y - offsetH * 3)
                    h = int(h + offsetH * 3.5)

                    # -------------------------- To Avoid Below 0  ----------------------
                    if x < 0 : x =0
                    if y < 0 : y =0
                    if w < 0 : w =0
                    if h < 0 : h =0

                    # ---------------------- Find the Blurriness in face -------------
                    imgFace = img[y:y + h, x:x + w]
                    cv2.imshow("Face", imgFace)
                    blurValue = int(cv2.Laplacian(imgFace, cv2.CV_64F).var())
                    if blurValue > blurThreshold:
                        listBlur.append(True)
                    else:
                        listBlur.append(False)

                    # -------------------------- Normalize the Value ----------------------
                    ih, iw,_ = img.shape
                    xc, yc = x+w/2, y+h/2
                    # print(xc, yc)
                    xcn, ycn = round(xc/iw, floatingpoint), round(yc/ih, floatingpoint)
                    wn, hn = round(w/iw, floatingpoint), round(h/ih, floatingpoint)
                    # print(xcn, ycn)

                    # -------------------------- To Avoid Above 1  ----------------------
                    if xcn > 1: xcn = 1
                    if ycn > 1: ycn = 1
                    if wn > 1: wn = 1
                    if hn > 1: hn = 1

                    listinfo.append(f"{classID} {xcn} {ycn} {wn} {hn}\n")

                    # -------------------------- Drawing ----------------------
                    cv2.rectangle(imgout, (x,y,w,h), (255,0,0), 3)
                    cvzone.putTextRect(imgout, f'Score: {int(score * 100)}% Blur:{blurValue}', (x,y-0), scale=2,thickness=3 )

                    if debug:
                        cv2.rectangle(img, (x, y, w, h), (255, 0, 0), 3)
                        cvzone.putTextRect(img, f'Score: {int(score * 100)}% Blur:{blurValue}', (x, y - 0), scale=2,thickness=3)

            # -----------------To save  -----------
            if save:
                if all(listBlur) and listBlur!=[]:
                    # ------ Save the Image ----------------
                    timeNow = time()
                    timeNow = str(timeNow).split('.')
                    timeNow = timeNow[0] + timeNow[1]
                    # print(timeNow)
                    cv2.imwrite(f"{outputfolderpath}/ {timeNow}.jpg", img)

                    # ------ Save Label Text File ----------------
                    for info in listinfo:
                        f = open(f"{outputfolderpath}/ {timeNow}.txt", "a")
                        f.write(info)
                        f.close()


    cv2.imshow("image", imgout)
    cv2.waitKey(1)





























