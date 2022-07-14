class Finish(forms.ModelForm):
class Meta:
model: finish
 fields = ('ProductModelNo',)
widgets = {
'finish': Select(),
}