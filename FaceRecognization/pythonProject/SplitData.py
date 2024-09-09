import os
import random
import shutil
from itertools import islice

otputfloderpath = "Dataset/SplitData"
inputFolderPath = "Dataset/All"
spliteRatio = {"train":0.7, "val":0.2, "test":0.1}
classes = ["real", "fake"]

try:
    shutil.rmtree(otputfloderpath)
    # print("remove the direactry")
except OSError as e:
    os.mkdir(otputfloderpath)

# ------------------------ Direaactry to create ------------------------
os.makedirs(f"{otputfloderpath}/train/images", exist_ok=True)
os.makedirs(f"{otputfloderpath}/train/labels", exist_ok=True)
os.makedirs(f"{otputfloderpath}/val/images", exist_ok=True)
os.makedirs(f"{otputfloderpath}/val/labels", exist_ok=True)
os.makedirs(f"{otputfloderpath}/test/images", exist_ok=True)
os.makedirs(f"{otputfloderpath}/test/labels", exist_ok=True)

# ---------------- Get The Name ------------
listNames = os.listdir(inputFolderPath)
# print(listNames)
# print(len(listNames))
uniqueNames = []
for name in listNames:
    uniqueNames.append(name.split(".")[0])
uniqueNames = list(set(uniqueNames))
print(len(uniqueNames))


# ---------------- Shuffle ------------
random.shuffle(uniqueNames)
# print(uniqueNames)

# ---------------- Find the Number of images for each folder ------------
lenData = len(uniqueNames)
lenTrain = int(lenData * spliteRatio['train'])
lenVal = int(lenData * spliteRatio['val'])
lenTest = int(lenData * spliteRatio['test'])


# ---------------- Put remaining images in Training ------------
if lenData != lenTrain+lenVal+lenTest:
    remaining = lenData-(lenTrain+lenVal+lenTest)
    lenTrain += remaining


# ---------------- Split the list ------------
lengthToSplit = [lenTrain, lenVal, lenTest]
Input = iter(uniqueNames)
Output = [list(islice(Input, elem)) for elem in lengthToSplit]
print(f'Total images:{lenData} \n split: {len(Output[0])} {len(Output[1])} {len(Output[2])}')


# ---------------- Copy the file ------------
sequence = ['train','val','test']
for i,out in enumerate(Output):
    for fileName in out:
        shutil.copy(f'{inputFolderPath}/{fileName}.jpg', f'{otputfloderpath}/{sequence[i]}/images/{fileName}.jpg')
        shutil.copy(f'{inputFolderPath}/{fileName}.txt', f'{otputfloderpath}/{sequence[i]}/images/{fileName}.txt')

print("Split Process Competed")

# --------------- creating data.yaml file ------------------
# dataYaml = f'path: ../Data\n\
# train: ../train/images\n\
# val: ../val/images\n\
# test: ../test/images\n\
# \n\
# nc: {len(classes)}\n\
# names: {classes}'
#
# f = open(f"{otputfloderpath}/data.yaml", "a")
# f.write(dataYaml)
# f.close()



# -------------------- For the Offline ---------------------------

dataOfflineYaml = f'path: D:\Clg_Project\FaceRecognization\pythonProject\Dataset\SplitData\n\
train: ../train/images\n\
val: ../val/images\n\
test: ../test/images\n\
\n\
nc: {len(classes)}\n\
names: {classes}'

f = open(f"{otputfloderpath}/dataOffline.yaml", "a")
f.write(dataOfflineYaml)
f.close()

print("Data, ymal file created........")





























