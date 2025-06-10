import cv2
import numpy as np
import insightface
from insightface.app import FaceAnalysis
import os

app = FaceAnalysis(name='buffalo_l')
app.prepare(ctx_id=0, det_size=(640, 640))

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, "inswapper_128.onnx")

swapper = insightface.model_zoo.get_model(model_path, download=False, download_zip=False)

def swap_n_show(img1_data, img2_data, app=app, swapper=swapper):
    img1_array = np.frombuffer(img1_data, np.uint8)
    img1 = cv2.imdecode(img1_array, cv2.IMREAD_COLOR)

    img2_array = np.frombuffer(img2_data, np.uint8)
    img2 = cv2.imdecode(img2_array, cv2.IMREAD_COLOR)

    face1 = app.get(img1)[0]
    face2 = app.get(img2)[0]

    img2_ = img2.copy()
    img2_ = swapper.get(img2_, face2, face1, paste_back=True)

    return img2_
