from rest_framework.serializers import Serializer, ValidationError
from rest_framework.utils.serializer_helpers import ReturnDict
from allauth.account import app_settings as allauth_settings



class CustomErrorSerializer(object):
    # Overiding the default error message
    @property
    def errors(self):
        ret = super().errors
        if isinstance(ret, list) and len(ret) == 1 and getattr(ret[0], 'code', None) == 'null':
            # Edge case. Provide a more descriptive error than
            # "this field may not be null", when no data is passed.
            detail = ErrorDetail('No data provided', code='null')
            ret = {api_settings.NON_FIELD_ERRORS_KEY: [detail]}

        # print(str(ret.items()))
        # my_dict = {'foo': 'bar', 'spam': 'eggs'}

        if not ret:
            return
        first_error = next(iter(ret))
        try:
            msg = ret[first_error][0]
            error_msg = msg.replace('This field', first_error)
        except KeyError:
            msg = ret[first_error]['response_message'][0]
            error_msg = msg.replace('This field', first_error)

        context = {
            'error_msg': error_msg
        }
        return ReturnDict(context, serializer=self)