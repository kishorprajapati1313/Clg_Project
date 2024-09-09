from ultralytics import YOLO

model = YOLO('yolov8n.pt')

def main():
    # model.train(data="Dataset/SplitData/data.yaml", epochs=3) # -------------- Online way ----------

    model.train(data="Dataset/SplitData/dataOffline.yaml", epochs=10) # -------------- Offline way of training ----------


if __name__ == "__main__":
    main()