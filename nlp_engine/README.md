#NLP Engine

Requires:

Model: Neural CoreF: 2.0.12

SpaCy: 2.0.18
Large Model

1. Native Env
- Python3
- SpaCy
- Falcon
- Everything else

2. CoreF Env
- Python2.7
- Spacy 2.0.12
- Neural CoreF
- Falcon
pip install spacy==2.0.12



Refer:
https://github.com/huggingface/neuralcoref
https://spacy.io/models/en#en_vectors_web_lg
https://github.com/explosion/spacy-models/releases//tag/en_core_web_lg-2.1.0

Download and pip-install
(venv) https://github.com/huggingface/neuralcoref-models/releases/download/en_coref_lg-3.0.0/en_coref_lg-3.0.0.tar.gz
(native) https://github.com/explosion/spacy-models/releases/download/en_core_web_lg-2.1.0/en_core_web_lg-2.1.0.tar.gz


Native
- run ./textlabler.py

Venv
- run ./nlp.py
